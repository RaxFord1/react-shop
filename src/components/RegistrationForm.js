import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomInput from "./CustomInput";

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

const onSubmit = (values) => {
  console.log("Form data:", values);
  alert("Success");
};

const RegistrationForm = () => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    <Form>
      <CustomInput label="First Name:" name="firstName" type="text" />
      <CustomInput label="Last Name:" name="lastName" type="text" />
      <CustomInput label="Email:" name="email" type="email" />
      <CustomInput label="Age:" name="age" type="number" />
      <CustomInput label="Password:" name="password" type="password" />
      <button type="submit">Submit</button>
    </Form>
  </Formik>
);

export default RegistrationForm;
