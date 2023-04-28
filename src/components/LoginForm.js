import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const initialValues = {
  email: "",
  password: "",
};

const onSubmit = (values) => {
  console.log("Form data:", values);
};
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "Must be at least 8 characters")
    .matches(
      /(?=.*[A-Z])(?=.*[^a-zA-Z])/,
      "Must contain at least 1 uppercase letter and 1 non-letter character"
    )
    .required("Required"),
});

const LoginForm = () => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    {({ errors, touched }) => (
      <Form>
        <label htmlFor="email">Email:</label>
        <Field id="email" name="email" type="email" />
        <ErrorMessage name="email" />

        <label htmlFor="password">Password:</label>
        <Field id="password" name="password" type="password" />
        <ErrorMessage name="password" />

        <button type="submit">Submit</button>
      </Form>
    )}
  </Formik>
);

export default LoginForm;
