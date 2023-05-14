import { createContext, useContext, useEffect, useState } from "react";
import { message } from "antd";
import UserContext from "./UserContext";
import CardsContext from "./CardsContext";
import axios from "axios";

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
  const cardsCtx = useContext(CardsContext);
  const userCtx = useContext(UserContext);

  useEffect(() => {
    reloadFavoritesFromBackend();
  }, []);

  function addSelectedWithBackend(id) {
    // TODO: request to server
    addSelectedHandler(id);
  }

  function addSelectedHandler(id) {
    console.log("i", id);
    setFavouriteItemsSelected((prevItemsSelected) => {
      return prevItemsSelected.concat(id);
    });
  }

  function addSelectedByIdHandler(id) {
    for (const element of cardsCtx.items) {
      if (id === element.id) {
        addSelectedHandler(element);
      }
      console.log(element);
    }
  }

  function removeSelectedHandler(itemId) {
    setFavouriteItemsSelected((prevItemsSelected) => {
      return prevItemsSelected.filter((id) => id !== itemId);
    });
  }

  function itemIsSelected(itemId) {
    return favouriteItemsSelected.some((id) => id === itemId);
  }

  function reloadFavoritesFromBackend() {
    console.log("userCtx.userId", userCtx.userId);
    if (userCtx.userId !== undefined) {
      setFavouriteItemsSelected([]);
      axios
        .get("http://127.0.0.1:5000/favorites/" + userCtx.userId)
        .then((response) => {
          const fav_ids = response.data.favorites;
          for (const id of fav_ids) {
            addSelectedByIdHandler(id);
            console.log(id);
          }
          message.error("Fetched favs!");
        })
        .catch((error) => {
          console.error("Error fetching favorites:", error);
          message.error("Error fetching favorites");
        });
    }
  }

  const context = {
    selectedItems: favouriteItemsSelected,
    totalSelectedItems: favouriteItemsSelected.length,
    addItem: addSelectedWithBackend,
    removeItem: removeSelectedHandler,
    isSelected: itemIsSelected,
    reloadFavorites: reloadFavoritesFromBackend,
  };

  return (
    <FavouriteContext.Provider value={context}>
      {props.children}
    </FavouriteContext.Provider>
  );
}

export default FavouriteContext;
