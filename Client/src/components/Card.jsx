import React, { useState } from "react";
import { formatDate } from "../functions/formatDate";
import { deleteUser, undeleteUser, updateUser } from "../api/user";
import { useAuth } from "../context/authContext";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const validitionSchema = Yup.object({
  name: Yup.string()
    .min(2, "Full name must be at least 2 characters")
    .required("Name is required")
    .matches(/^[a-zA-Z\s'-]+$/, "Invalid name"),
});

export default function Card({
  title,
  name,
  email,
  createdAt,
  role,
  id,
  isDeleted,
  handleDelete,
  handleUnDelete,
  isLoading,
  reFetchUser,
}) {
  const { isAdmin, loading, user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const initialValues = {
    name: name,
  };
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const data = { name: values.name };
      await updateUser(id, data);
      setIsEditing(false);
      alert("User updated successfully!");
    } catch (error) {
      alert("User not updated");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="feature-card card glass-card">
      <h4 className={isDeleted ? "logout" : ""}>{title || "My Info"}</h4>
      {id && isAdmin && (
        <p className="userInfo">
          Id: <strong>{id || "Loading..."}</strong>
        </p>
      )}
      <p className="userInfo">
        Name: <strong>{name || "Loading..."}</strong>
      </p>
      <p className="userInfo">
        Email: <strong>{email || "Loading..."}</strong>
      </p>
      {role && (
        <p className="userInfo">
          Role: <strong>{role || "Loading..."}</strong>
        </p>
      )}
      <p className="userInfo">
        Joined At: <strong>{formatDate(createdAt) || "Loading..."}</strong>
      </p>

      {isEditing && (
        <>
          <Formik
            initialValues={initialValues}
            validationSchema={validitionSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, touched, errors }) => (
              <Form style={{ marginTop: "2rem" }}>
                <div className="form-group">
                  <label htmlFor="email">Name</label>
                  <Field
                    type="text"
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

                <button
                  disabled={isSubmitting || loading}
                  type="submit"
                  className="login-button"
                >
                  {isSubmitting ? "Updating..." : "Confirm"}
                </button>
              </Form>
            )}
          </Formik>
        </>
      )}

      {user?._id === id && (
        <button
          disabled={isLoading || loading}
          className={isEditing ? "red" : "login-button"}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing
            ? isLoading
              ? "Canceling..."
              : "Cancel"
            : isLoading
            ? "Updating..."
            : "Edit Name"}
        </button>
      )}

      {isAdmin && title !== "Admin Info" && !isDeleted && (
        <button
          disabled={isLoading || loading}
          className="red"
          onClick={handleDelete}
        >
          {isLoading ? "Deleting..." : "Delete user"}
        </button>
      )}

      {isAdmin && title !== "Admin Info" && isDeleted && (
        <button
          disabled={isLoading || loading}
          className="login-button"
          onClick={handleUnDelete}
        >
          {isLoading ? "Un-Deleting..." : "Un-Delete user"}
        </button>
      )}
    </div>
  );
}
