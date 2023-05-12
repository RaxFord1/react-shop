import { createContext, useState } from "react";

const CartItemsContext = createContext({
  selectedItems: [],
  totalSelectedItems: 0,
  addItem: (item) => {},
  removeItem: (itemId) => {},
  isSelected: (itemId) => {},
  getTotal: () => {},
});

export function CartItemsProvider(props) {
  const [cartItemsSelected, setCartItemsSelected] = useState([]);

  function addSelectedHandler(id) {
    setCartItemsSelected((prevItemsSelected) => {
      return prevItemsSelected.concat(id);
    });
  }

  function removeSelectedHandler(itemId) {
    setCartItemsSelected((prevItemsSelected) => {
      return prevItemsSelected.filter((id) => id !== itemId);
    });
  }

  function itemIsSelected(itemId) {
    return cartItemsSelected.some((id) => id === itemId);
  }

  const context = {
    selectedItems: cartItemsSelected,
    totalSelectedItems: cartItemsSelected.length,
    addItem: addSelectedHandler,
    removeItem: removeSelectedHandler,
    isSelected: itemIsSelected,
  };

  return (
    <CartItemsContext.Provider value={context}>
      {props.children}
    </CartItemsContext.Provider>
  );
}

export default CartItemsContext;
