import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import FormField from "./CustomInput";
import { Button, message } from "antd";
import axios from "axios";
import { BACKEND_URL } from "../config/cfg";

const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(3, "First name should be at least 3 characters")
    .required("Required"),
  lastName: Yup.string()
    .max(40, "Last name should be 40 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  age: Yup.number()
    .min(18, "Must be at least 18 years old")
    .max(99, "Must be 99 years old or younger")
    .required("Required"),
  password: Yup.string()
    .min(8, "Password should be at least 8 characters")
    .matches(
      /(?=.*[A-Z])(?=.*[^a-zA-Z])/,
      "Must contain at least 1 uppercase letter and 1 non-letter character"
    )
    .required("Required"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  age: "",
  password: "",
};

function RegistrationForm() {
  function registerOnFinish(values) {
    axios
      .post(BACKEND_URL + "/user", {
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        password_hash: values.password,
      })
      .then((response) => {
        console.error("Successfully registered:", response);
        message.success("Successfully registered");
      })
      .catch((error) => {
        console.error("Error registering:", error);
        message.error("Error registering");
      });
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={registerOnFinish}
    >
      <Form>
        <FormField label="First Name:" name="firstName" type="text" />
        <FormField label="Last Name:" name="lastName" type="text" />
        <FormField label="Email:" name="email" type="email" />
        <FormField label="Age:" name="age" type="number" />
        <FormField label="Password:" name="password" type="password" />
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </Formik>
  );
}

export default RegistrationForm;
