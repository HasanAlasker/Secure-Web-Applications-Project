import React from "react";
import { formatDate } from "../functions/formatDate";

export default function Card({title, name, email, createdAt, role, id }) {
  return (
    <div className="feature-card card">
      <h4>{title || "My Info"}</h4>
      {id && <p>Id: <strong>{id}</strong></p>}
      <p>Name: <strong>{name}</strong></p>
      <p>Email: <strong>{email}</strong></p>
      {role && <p>Role: <strong>{role}</strong></p>}
      <p>Joined At: <strong>{formatDate(createdAt)}</strong></p>
    </div>
  );
}
