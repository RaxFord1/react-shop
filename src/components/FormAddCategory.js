import { Button, Form, Input } from "antd";

function FormAddCategory(props) {
  return (
    <Form name="add_category" onFinish={props.onFinish}>
      <Form.Item
        label="Label"
        name="label"
        rules={[
          { required: true, message: "Please enter the category label!" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Value"
        name="value"
        rules={[
          { required: true, message: "Please enter the category value!" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Category
        </Button>
      </Form.Item>
    </Form>
  );
}

export default FormAddCategory;
