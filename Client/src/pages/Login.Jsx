import React from "react";
import { useAuth } from "../context/authContext";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "../App.css";

const validitionSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required")
    .trim(),
  password: Yup.string().required("Password is required").trim(),
});

const initialValues = {
  email: "",
  password: "",
};

export default function Login() {
  const { user, loading, login, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    const loginData = {
      email: values.email,
      password: values.password,
    };
    await login(loginData);
    setSubmitting(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Please login to your account</p>

        <Formik
          initialValues={initialValues}
          validationSchema={validitionSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, touched, errors }) => (
            <Form className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className={touched.email && errors.email ? "input-error" : ""}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className={
                    touched.password && errors.password ? "input-error" : ""
                  }
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
              </div>

              <button
                disabled={isSubmitting || loading}
                type="submit"
                className="login-button"
              >
                {isSubmitting || loading ? "Logging in..." : "Login"}
              </button>

              {error && (
                <div className="error-message large">
                  Wrong email or password
                </div>
              )}

              <p className="signup-link">
                Don't have an account?{" "}
                <span onClick={() => navigate("/register")}>Sign up</span>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
