import { createContext, useState } from "react";

const FavouriteContext = createContext({
  selectedItems: [],
  totalSelectedItems: 0,
  addItem: (item) => {},
  removeItem: (itemId) => {},
  isSelected: (itemId) => {},
  getTotal: () => {},
});

export function FavouriteItemsProvider(props) {
  const [favouriteItemsSelected, setFavouriteItemsSelected] = useState([]);

  function addSelectedHandler(item) {
    console.log("i", item)
    setFavouriteItemsSelected((prevItemsSelected) => {
      return prevItemsSelected.concat(item);
    });
  }

  function removeSelectedHandler(itemId) {
    setFavouriteItemsSelected((prevItemsSelected) => {
      return prevItemsSelected.filter((item) => item.id !== itemId);
    });
  }

  function itemIsSelected(itemId) {
    return favouriteItemsSelected.some((item) => item.id === itemId);
  }

  const context = {
    selectedItems: favouriteItemsSelected,
    totalSelectedItems: favouriteItemsSelected.length,
    addItem: addSelectedHandler,
    removeItem: removeSelectedHandler,
    isSelected: itemIsSelected,
  };

  return (
    <FavouriteContext.Provider value={context}>
      {props.children}
    </FavouriteContext.Provider>
  );
}

export default FavouriteContext;
