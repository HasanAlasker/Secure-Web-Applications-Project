import React from "react";
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
  const { isAdmin } = useAuth();

  const handleDelete = async () => {
    let text = `Are you sure you want to delete ${name} account?`;
    if (confirm(text) === true) {
      try {
        const result = await deleteUser(id);
        if (result.ok) {
          alert(`${name} account deleted successfully!`);
        } else alert("Something went wrong!", err);
      } catch (err) {
        alert("Something went wrong!", err);
      }
    }
  };

  const handleUnDelete = async () => {
    let text = `Are you sure you want to restore ${name} account?`;
    if (confirm(text) === true) {
      try {
        const result = await undeleteUser(id);
        if (result.ok) {
          alert(`${name} account restored successfully!`);
        } else alert("Something went wrong!", err);
      } catch (err) {
        alert("Something went wrong!", err);
      }
    }
  };
  return (
    <div className="feature-card card">
      <h4 className={isDeleted? 'logout' : ''}>{title || "My Info"}</h4>
      {id && (
        <p>
          Id: <strong>{id}</strong>
        </p>
      )}
      <p>
        Name: <strong>{name}</strong>
      </p>
      <p>
        Email: <strong>{email}</strong>
      </p>
      {role && (
        <p>
          Role: <strong>{role}</strong>
        </p>
      )}
      <p>
        Joined At: <strong>{formatDate(createdAt)}</strong>
      </p>
      {isAdmin && title !== "Admin Info" && !isDeleted && (
        <button className="red" onClick={handleDelete}>
          Delete user
        </button>
      )}
      {isAdmin && title !== "Admin Info" && isDeleted && (
        <button className="login-button" onClick={handleUnDelete}>
          Un-Delete user
        </button>
      )}
    </div>
  );
}
