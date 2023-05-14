import { createContext, useContext, useEffect, useState } from "react";
import { message } from "antd";
import UserContext from "./UserContext";
import axios from "axios";
import { BACKEND_URL } from "../config/cfg";

const FavouriteContext = createContext({
  selectedItems: [],
  totalSelectedItems: 0,
  addItem: (item) => {},
  addItemById: (id) => {},
  removeItem: (itemId) => {},
  isSelected: (itemId) => {},
  getTotal: () => {},
  reloadFavorites: () => {},
});

export function FavouriteItemsProvider(props) {
  const [favouriteItemsSelected, setFavouriteItemsSelected] = useState([]);
  const userCtx = useContext(UserContext);

  useEffect(() => {
    reloadFavoritesFromBackend();
  }, [userCtx]);

  function addSelectedWithBackend(itemId) {
    if (userCtx.userId) {
      // TODO: request to server
      axios
        .post(BACKEND_URL + "/favourite", {
          user_id: userCtx.userId,
          item_id: itemId,
        })
        .then((response) => {
          addSelectedHandler(itemId);
        })
        .catch((error) => {
          console.error("Error adding favourite:", error);
          message.error("Error adding favourite");
        });
    }
    addSelectedHandler(itemId);
  }

  function removeSelectedWithBackend(itemId) {
    if (userCtx.userId) {
      // TODO: request to server
      axios
        .delete(BACKEND_URL + "/favourite/" + userCtx.userId + "/" + itemId)
        .then((response) => {
          removeSelectedHandler(itemId);
        })
        .catch((error) => {
          console.error("Error removing favourite:", error);
          message.error("Error removing favourite");
        });
    }
    removeSelectedHandler(itemId);
  }

  function addSelectedHandler(id) {
    setFavouriteItemsSelected((prevItemsSelected) => {
      return prevItemsSelected.concat(id);
    });
  }

  function removeSelectedHandler(itemId) {
    setFavouriteItemsSelected((prevItemsSelected) => {
      return prevItemsSelected.filter((id) => id !== itemId);
    });
  }

  function isSelected(itemId) {
    return favouriteItemsSelected.some((id) => id === itemId);
  }

  function reloadFavoritesFromBackend() {
    console.log("userCtx.userId", userCtx.userId);
    if (userCtx.userId) {
      setFavouriteItemsSelected([]);
      axios
        .get(BACKEND_URL + "/favourite/" + userCtx.userId)
        .then((response) => {
          const fav_ids = response.data.favorites;
          if (fav_ids) {
            for (const id of fav_ids) {
              addSelectedHandler(id);
              console.log(id);
            }
          }
          message.success("Fetched favs!");
        })
        .catch((error) => {
          console.error("Error fetching favorites:", error);
          message.error("Error fetching favorites");
        });
    }
  }

  function toggleSelectedBackend(itemid) {
    if (isSelected(itemid)) {
      removeSelectedWithBackend(itemid);
    } else {
      addSelectedWithBackend(itemid);
    }
  }

  const context = {
    selectedItems: favouriteItemsSelected,
    totalSelectedItems: favouriteItemsSelected.length,
    isSelected: isSelected,
    toggleSelected: toggleSelectedBackend,
    reloadFavorites: reloadFavoritesFromBackend,
  };

  return (
    <FavouriteContext.Provider value={context}>
      {props.children}
    </FavouriteContext.Provider>
  );
}

export default FavouriteContext;
