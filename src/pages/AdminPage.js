import React, { useState } from "react";
import {
  Button, Card, Col, Form, Input, List, Modal, Row, Select, Table, Upload,
} from "antd";
import {
  PlusOutlined, UploadOutlined, TableOutlined, AppstoreOutlined,
} from "@ant-design/icons";
import Template from "../layout/Template";
import { categories } from "./CategoryPage";
import { CardsListData } from "./IndexPage";

const { Option } = Select;

const AdminPage = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(CardsListData);
  const [viewType, setViewType] = useState("list");

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = (values) => {
    setLoading(true);

    setTimeout(() => {
      const newProduct = {
        ...values,
        id: `card${products.length + 1}`,
        displayed_price: `$${values.price}`,
        image: values.image.file.name,
      };
      setProducts([...products, newProduct]);
      setLoading(false);
      setVisible(false);
    }, 1000);
    console.log(products)
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
      title: "Price",
      dataIndex: "displayed_price",
      key: "displayed_price",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
  ];

  return (
    <Template>
      <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
        Add Product
      </Button>
      <Button onClick={() => setViewType("table")} icon={<TableOutlined />} style={{ marginLeft: 10 }}>
        Table View
      </Button>
      <Button onClick={() => setViewType("list")} icon={<AppstoreOutlined />} style={{ marginLeft: 10 }}>
        List View
      </Button>
      <Modal title="Add Product" visible={visible} onCancel={handleCancel} footer={null}>
        <Form name="add_product" onFinish={onFinish}>
          <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter product name!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Price" name="price" rules={[{ required: true, message: "Please enter product price!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Category" name="category"
            rules={[{ required: true, message: "Please select a category!" }]}
          >
            <Select placeholder="Select a category">
              {categories.map((category) => (
                <Option key={category.value} value={category.value}>
                  {category.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Image" name="image"
            rules={[{ required: true, message: "Please upload an image!" }]}
          >
            <Upload>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={loading}>
              Add Product
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {viewType === "list" ? (
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={products}
          renderItem={(item) => (
            <List.Item>
              <Card title={item.name} cover={<img alt="example" src={item.image} />}>
                {item.displayed_price}
              </Card>
            </List.Item>
          )}
        />
      ) : (
        <Table
          dataSource={products} columns={columns} rowKey="id" pagination={false} style={{ marginTop: 20 }}
        />
      )}
    </Template>
  );
};

export default AdminPage;
