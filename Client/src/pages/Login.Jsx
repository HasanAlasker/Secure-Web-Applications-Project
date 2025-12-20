import React from "react";
import { useAuth } from "../context/authContext";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const validitionSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required")
    .trim(),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required")
    .trim(),
});

const initialValues = {
  email: "",
  password: "",
};

export default function Login() {
  const { user, loading, login } = useAuth();

  const handleSubmit = () => {};

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validitionSchema}
      onSubmit={handleSubmit}
    >
      {() => <Form></Form>}
    </Formik>
  );
}
