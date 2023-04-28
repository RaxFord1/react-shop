import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { CustomTextArea } from "./CustomInput";

const initialValues = {
  comment: "",
};

const validationSchema = Yup.object({
  comment: Yup.string()
    .min(1, "Comment should not be empty")
    .max(500, "Comment should be 500 characters or less")
    .required("Required"),
});

const onSubmit = (values) => {
  alert("success");
  console.log("Form data:", values);
};

const CommentForm = () => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    <Form>
      <CustomTextArea label="Comment:" name="comment" rows="5" />
      <button type="submit">Submit</button>
    </Form>
  </Formik>
);

export default CommentForm;
