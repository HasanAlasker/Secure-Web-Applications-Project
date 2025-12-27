import React, { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "../App.css";
import useApi from "../hooks/useApi";
import { awake, getMe } from "../api/user";

const validitionSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please enter a valid email address (e.g. name@example.com)"
    ),
  password: Yup.string()
    .min(8, "Incorrect email or password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Incorrect email or password"
    )
    .required("Password is required")
    .trim(),
});

const initialValues = {
  email: "",
  password: "",
};

export default function Login() {
  const { user, loading, login, error, status } = useAuth();

  const {
    data,
    request,
    loading: fetching,
    error: errorFetching,
  } = useApi(awake);

  const navigate = useNavigate();

  useEffect(() => {
    request();
  }, []);

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    const loginData = {
      email: values.email,
      password: values.password,
    };
    await login(loginData);
    setSubmitting(false);
  };

  return (
    <div className="login-container background">
      <div className="login-card glass-card">
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
                disabled={isSubmitting || loading || fetching}
                type="submit"
                className="login-button"
              >
                {fetching || loading
                  ? "Connecting server..."
                  : isSubmitting
                  ? "Logging in..."
                  : "Login"}
              </button>

              {error && !errorFetching && status !== 429 && (
                <div className="error-message large">
                  Wrong email or password
                </div>
              )}
              {errorFetching && status !== 429 && (
                <div className="error-message large">
                  Couldn't connect to the server
                </div>
              )}
              {status === 429 && (
                <div className="error-message large">
                  Blocked for too many requests
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
