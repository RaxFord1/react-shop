import { Button, Form, Input, Modal, Select, Switch } from "antd";

import { useContext, useEffect } from "react";
import CategoriesContext from "../store/CategoriesContext";

const { Option } = Select;

function ItemModalForm(props) {
  const [form] = Form.useForm();
  const categoriesCtx = useContext(CategoriesContext);
  const item = props.item;

  useEffect(() => {
    form.resetFields(); // Reset the form fields whenever the modal is opened or closed
  }, [form, props.visible]);

  useEffect(() => {
    if (item) {
      form.setFieldsValue(item); // Pre-fill the form fields with the values from the item object
    }
  }, [form, item]);

  return (
    <Modal
      title={item ? "Edit Product" : "Add Product"}
      visible={props.visible}
      onCancel={props.handleCancel}
      footer={null}
    >
      <Form
        form={form}
        name="add_product"
        onFinish={item ? props.onFinishEdit : props.onFinishAdd}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter product name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please write description!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please enter product price!" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please select a category!" }]}
        >
          <Select placeholder="Select a category">
            {categoriesCtx.categories.map((category) => (
              <Option key={category.value} value={category.value}>
                {category.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Image"
          name="image"
          rules={[{ required: true, message: "Please upload an image!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="On Sale" name="on_sale" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={props.loading}>
            {item ? "Update" : "Add Product"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ItemModalForm;
