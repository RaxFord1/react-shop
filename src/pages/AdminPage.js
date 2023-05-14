import React, { useContext, useState } from "react";
import { Button, List, Table, message } from "antd";
import {
  PlusOutlined,
  TableOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import Template from "../layout/Template";
import CardsContext from "../store/CardsContext";
import ItemModalForm from "../components/ItemModalForm";
import CardAdmin from "../components/CardAdmin";
import axios from "axios";
import { BACKEND_URL } from "../config/cfg";

const AdminPage = () => {
  const cardCtx = useContext(CardsContext);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [viewType, setViewType] = useState("list");
  const [editableItem, setEditableItem] = useState(undefined);

  const products = cardCtx.items;

  const showModalAdd = () => {
    setEditableItem(undefined);
    setVisible(true);
  };

  const showModalEdit = (item) => {
    setEditableItem(item);
    setVisible(true);
  };

  const deleteItem = (item) => {
    axios
      .delete(BACKEND_URL + "/item/" + item.id)
      .then((response) => {
        message.success("Item deleted");
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
        message.error("Error deleting item");
      })
      .finally(() => {
        cardCtx.reloadItems();
      });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onFinishAdd = (values) => {
    setLoading(true);
    var on_sale = values.on_sale;
    if (!on_sale) {
      on_sale = false;
    }
    const newProduct = {
      ...values,
      on_sale: on_sale,
    };
    axios
      .post(BACKEND_URL + "/item", newProduct)
      .then((response) => {
        message.success("Item added successfully");
      })
      .catch((error) => {
        console.error("Error adding item:", error);
        message.error(
          "Error adding                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    item"
        );
      })
      .finally(() => {
        cardCtx.reloadItems();
      });

    setLoading(false);
    setVisible(false);
    console.log(products);
  };

  const onFinishEdit = (values) => {
    setLoading(true);
    var on_sale = values.on_sale;
    if (!on_sale) {
      on_sale = false;
    }
    const newProduct = {
      ...values,
      on_sale: on_sale,
    };
    axios
      .put(BACKEND_URL + "/item/" + editableItem.id, newProduct)
      .then((response) => {
        message.success("Item added successfully");
      })
      .catch((error) => {
        console.error("Error adding item:", error);
        message.error(
          "Error adding                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    item"
        );
      })
      .finally(() => {
        cardCtx.reloadItems();
      });

    setLoading(false);
    setVisible(false);
    console.log(products);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "On Sale",
      dataIndex: "on_sale",
      key: "on_sale",
    },
  ];

  return (
    <Template>
      <Button type="primary" onClick={showModalAdd} icon={<PlusOutlined />}>
        Add Product
      </Button>
      <Button
        onClick={() => setViewType("table")}
        icon={<TableOutlined />}
        style={{ marginLeft: 10 }}
      >
        Table View
      </Button>
      <Button
        onClick={() => setViewType("list")}
        icon={<AppstoreOutlined />}
        style={{ marginLeft: 10 }}
      >
        List View
      </Button>
      <ItemModalForm
        visible={visible}
        handleCancel={handleCancel}
        onFinishAdd={onFinishAdd}
        onFinishEdit={onFinishEdit}
        loading={loading}
        item={editableItem}
      />

      {viewType === "list" ? (
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={products}
          renderItem={(item) => (
            <List.Item>
              <CardAdmin
                key={item.id}
                item={item}
                onEdit={showModalEdit}
                onDelete={deleteItem}
              />
            </List.Item>
          )}
        />
      ) : (
        <Table
          dataSource={products}
          columns={columns}
          rowKey="id"
          pagination={false}
          style={{ marginTop: 20 }}
        />
      )}
    </Template>
  );
};

export default AdminPage;
