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
}) {
  const { isAdmin, loading } = useAuth();

  const [isLoading, setLoading] = useState(false);
  const [btn, setBtn] = useState(isDeleted);

  const handleDelete = async () => {
    setLoading(true);
    let text = `Are you sure you want to delete ${name} account?`;
    if (confirm(text) === true) {
      try {
        const result = await deleteUser(id);
        if (result.ok) {
          alert(`${name} account deleted successfully!`);
          setBtn(!btn);
        } else alert("Something went wrong!", err);
      } catch (err) {
        alert("Something went wrong!", err);
      }
    }
    setLoading(false);
  };

  const handleUnDelete = async () => {
    let text = `Are you sure you want to restore ${name} account?`;
    setLoading(true);
    if (confirm(text) === true) {
      try {
        const result = await undeleteUser(id);
        if (result.ok) {
          alert(`${name} account restored successfully!`);
          setBtn(!btn);
        } else alert("Something went wrong!", err);
      } catch (err) {
        alert("Something went wrong!", err);
      }
    }
    setLoading(false);
  };
  return (
    <div className="feature-card card glass-card">
      <h4 className={btn ? "logout" : ""}>{title || "My Info"}</h4>
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
      {isAdmin && title !== "Admin Info" && !btn && (
        <button
          disabled={isLoading || loading}
          className="red"
          onClick={handleDelete}
        >
          {isLoading ? "Deleting..." : "Delete user"}
        </button>
      )}
      {isAdmin && title !== "Admin Info" && btn && (
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
