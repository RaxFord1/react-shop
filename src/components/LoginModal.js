import React, { useContext, useState } from "react";
import { Modal, Button, Form, Input, Spin, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { BACKEND_URL } from "../config/cfg";
import UserContext from "../store/UserContext";
import { NavLink } from "react-router-dom";

const LoginModal = () => {
  const userCtx = useContext(UserContext);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    var email = values.email;
    var password = values.password;
    console.log("Success:", values);
    axios
      .post(BACKEND_URL + "/login", { email, password })
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          setVisible(false);
          setIsAuthenticated(true);
          userCtx.setUserId(res.data.id);
          message.success("Successfully logged in!");
        } else {
          message.error(res.message);
        }
      })
      .catch((reason) => {
        setLoading(false);
        console.log(reason.toJSON());
        if (reason.response.status === 401) {
          message.error("Incorrect email or password");
        } else {
          message.error("Server error!");
        }
      })
      .finally(() => {
        console.log("finaly");
        // favCtx.reloadFavorites();
      });
    // Тут можна виконати ваш запит на авторизацію
    setTimeout(() => {}, 2000);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    userCtx.setUserId(undefined);
    message.success("Successfully logged out!");
  };

  return (
    <>
      {isAuthenticated ? (
        <Button type="primary" onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <Button type="primary" onClick={showModal}>
          Login
        </Button>
      )}
      <Modal
        title="Authorization"
        open={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please, enter your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please, enter your password!" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={loading}>
              {loading ? <Spin indicator={<LoadingOutlined />} /> : "Login"}
            </Button>
          </Form.Item>
        </Form>
        <NavLink className="nav-link" to="/login">
          Register Page
        </NavLink>
      </Modal>
    </>
  );
};

export default LoginModal;
