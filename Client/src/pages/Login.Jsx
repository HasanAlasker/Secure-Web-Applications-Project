import React from "react";
import { useAuth } from "../context/authContext";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate()

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    const loginData = {
      email: values.email,
      password: values.password,
    };
    login(loginData);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validitionSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, touched, errors, status }) => (
        <Form>
          <Field
            type="email"
            id="email"
            name="email"
            placeholder="Enter Your Email"
          />
          <ErrorMessage
            name="email"
            component="div"
            className="error-message"
          />
          <Field
            type="password"
            id="password"
            name="password"
            placeholder="Enter Your Password"
          />
          <ErrorMessage
            name="password"
            component="div"
            className="error-message"
          />

          <button disabled={isSubmitting || loading} type="submit">
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
