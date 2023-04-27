import React, { useState } from 'react';
import { Modal, Button, Form, Input, Spin, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const LoginForm = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    console.log('Success:', values);
    // Тут можна виконати ваш запит на авторизацію
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
      setIsAuthenticated(true);
      message.success('Ви успішно увійшли!');
    }, 2000);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    message.success('Ви успішно вийшли!');
  };

  return (
    <>
      {isAuthenticated ? (
        <Button type="primary" onClick={handleLogout}>
          Вийти
        </Button>
      ) : (
        <Button type="primary" onClick={showModal}>
          Увійти
        </Button>
      )}
      <Modal
        title="Авторизація"
        visible={visible}
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
            rules={[{ required: true, message: 'Будь ласка, введіть ваш email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            rules={[{ required: true, message: 'Будь ласка, введіть ваш пароль!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={loading}>
              {loading ? <Spin indicator={<LoadingOutlined />} /> : 'Увійти'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default LoginForm;