import React, { useState } from "react";
import { formatDate } from "../functions/formatDate";
import { deleteUser, undeleteUser } from "../api/user";
import { useAuth } from "../context/authContext";

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
}) {
  const { isAdmin, loading } = useAuth();

  return (
    <div className="feature-card card glass-card">
      <h4 className={isDeleted ? "logout" : ""}>{title || "My Info"}</h4>
      {id && (
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
