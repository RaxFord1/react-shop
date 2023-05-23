import { createContext, useContext, useEffect, useState } from "react";
import UserContext from "./UserContext";
import axios from "axios";
import { BACKEND_URL } from "../config/cfg";
import { message } from "antd";

const CartItemsContext = createContext({
  cartId: 0,
  selectedItems: [],
  totalSelectedItems: 0,
  toggleSelected: (itemId) => {},
  isSelected: (itemId) => {},
  getTotal: () => {},
});

export function CartItemsProvider(props) {
  const [cartItemsSelected, setCartItemsSelected] = useState([]);
  const [cartId, setCartId] = useState(undefined);
  const userCtx = useContext(UserContext);
  const [needReload, setNeedReload] = useState(false);

  async function getLastCartId() {
    if (userCtx.userId) {
      await axios
        .get(BACKEND_URL + "/last_unpaid_order/" + userCtx.userId)
        .then((response) => {
          const response_id = response.data.id;
          setCartId(response_id);
          message.success("Fetched cartId!");
        })
        .catch((error) => {
          console.error("Error fetching favorites:", error);
          message.error("Error fetching favorites");
        });
    }
  }

  async function getItemsInOrder() {
    if (cartId) {
      axios
        .get(BACKEND_URL + "/order_items/" + cartId)
        .then((response) => {
          const items = response.data.items;
          var itemsIds = [];
          if (items) {
            itemsIds = items.map((item) => item.item_id);
          }
          setCartItemsSelected(itemsIds);
        })
        .catch((error) => {
          console.error("Error fetching order_items:", error);
          message.error("Error fetching order_items");
        });
    }
  }

  async function addItemBackend(itemId) {
    await axios
      .post(BACKEND_URL + "/order_item", {
        user_id: userCtx.userId,
        item_id: itemId,
      })
      .then(async (response) => {
        await getItemsInOrder();
      })
      .catch((error) => {
        console.error("Error adding order_items:", error);
        message.error("Error adding order_items");
      })
      .finally(async () => {
        await getItemsInOrder();
      });
  }

  async function removeSelectedBackend(itemId) {
    await axios
      .delete(BACKEND_URL + "/order_item/" + cartId + "/" + itemId)
      .then((response) => {})
      .catch((error) => {
        console.error("Error deleting order_items:", error);
        message.error("Error deleting order_items");
      })
      .finally(async () => {
        await getItemsInOrder();
      });
  }

  async function addSelectedHandler(itemId) {
    if (userCtx.userId) {
      addItemBackend(itemId);
    } else {
      addSelected(itemId);
    }
  }

  async function removeSelectedHandler(itemId) {
    if (userCtx.userId) {
      removeSelectedBackend(itemId);
    } else {
      removeSelected(itemId);
    }
  }

  function addSelected(id) {
    setCartItemsSelected((prevItemsSelected) => {
      return prevItemsSelected.concat(id);
    });
  }

  function removeSelected(itemId) {
    setCartItemsSelected((prevItemsSelected) => {
      return prevItemsSelected.filter((id) => String(id) !== String(itemId));
    });
  }

  function toggleSelectedHandler(itemId) {
    if (itemIsSelected(itemId)) {
      removeSelectedHandler(itemId);
    } else {
      addSelectedHandler(itemId);
    }
  }

  function itemIsSelected(itemId) {
    return cartItemsSelected.some((id) => String(id) === String(itemId));
  }

  function handleReload() {
    setNeedReload(!needReload);
  }

  useEffect(() => {
    getLastCartId();
  }, [needReload, userCtx]);

  useEffect(() => {
    getItemsInOrder();
  }, [cartId]);

  const context = {
    cartId: cartId,
    selectedItems: cartItemsSelected,
    totalSelectedItems: cartItemsSelected.length,
    toggleSelected: toggleSelectedHandler,
    isSelected: itemIsSelected,
    needReload: handleReload,
  };

  return (
    <CartItemsContext.Provider value={context}>
      {props.children}
    </CartItemsContext.Provider>
  );
}

export default CartItemsContext;
