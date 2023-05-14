import React from "react";
import { useField } from "formik";
import { Form, Input } from "antd";

const FormField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <Form.Item
      label={label}
      validateStatus={meta.touched && meta.error ? "error" : ""}
      help={meta.touched && meta.error ? meta.error : ""}
    >
      <Input {...field} {...props} />
    </Form.Item>
  );
};

export const CustomTextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <br />
      <textarea {...field} {...props} />
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </div>
  );
};

export default FormField;
