import React from "react";
import { useAuth } from "../context/authContext";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthRoute() {
  const { isUser, loading, user } = useAuth();

  if (loading) {
    return <h2 className="loading">Loading...</h2>;
  }

  if (!user || !isUser || user.isDeleted) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
