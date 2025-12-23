import React from "react";
import { useAuth } from "../context/authContext";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "../App.css";

const validitionSchema = Yup.object({
  name: Yup.string()
    .min(2, "Full name must be at least 2 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain uppercase, lowercase, number, and a special character "
    )
    .required("Password is required"),
});

const initialValues = {
  name: "",
  email: "",
  password: "",
};

export default function Register() {
  const { user, loading, register, error, errMsg } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    const loginData = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    await register(loginData);
    setSubmitting(false);
  };

  return (
    <div className="login-container background">
      <div className="login-card glass-card">
        <h1 className="login-title">Create an account</h1>
        <p className="login-subtitle">
          Please enter your information to create your account
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={validitionSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, touched, errors }) => (
            <Form className="login-form">
              <div className="form-group">
                <label htmlFor="email">Name</label>
                <Field
                  type="name"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  className={touched.name && errors.name ? "input-error" : ""}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="error-message"
                />
              </div>

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
                {isSubmitting || loading ? "Signing in..." : "Sign Up"}
              </button>

              {error && (
                <div className="error-message large">
                  {errMsg ? errMsg : "Something went wrong, Please try again"}
                </div>
              )}

              <p className="signup-link">
                Do you have an account?{" "}
                <span onClick={() => navigate("/login")}>Login</span>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
