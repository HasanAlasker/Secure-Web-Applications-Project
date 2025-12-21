import React from "react";
import { useAuth } from "../context/authContext";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthRoute() {
  const { isUser, loading, user } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !isUser) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
