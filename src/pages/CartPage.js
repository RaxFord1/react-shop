import React, { useContext } from "react";
import { Table, Button, message } from "antd";
import Template from "../layout/Template";
import CartItemsContext from "../store/CartItemsContext";
import CardsContext from "../store/CardsContext";
import axios from "axios";
import { BACKEND_URL } from "../config/cfg";

function CartPage() {
  const cartCtx = useContext(CartItemsContext);
  const cardCts = useContext(CardsContext);

  function handleSubmitOrder() {
    axios
      .post(BACKEND_URL + "/pay", { order_id: cartCtx.cartId })
      .then((response) => {
        message.success("Successfully submited order!");
      })
      .catch((error) => {
        console.error("Error submiting order:", error);
        message.error("Error submiting order");
      });

    cartCtx.needReload();
  }

  var cartItems = [];
  if (cartCtx.selectedItems) {
    for (let element_id of cartCtx.selectedItems) {
      cartItems.push(cardCts.items.find((card) => card.id === element_id));
    }
  }
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  // Columns configuration for the cart table
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Button type="primary" danger>
          Remove
        </Button>
      ),
    },
  ];

  return (
    <Template>
      <div>
        <h1>Cart</h1>
        <Table rowKey="id" dataSource={cartItems} columns={columns} pagination={false} />
        <div style={{ marginTop: 20 }}>
          <h3>Total Price: {totalPrice}</h3>
          <Button type="primary" onClick={handleSubmitOrder}>
            Submit Order
          </Button>
        </div>
      </div>
    </Template>
  );
}

export default CartPage;
