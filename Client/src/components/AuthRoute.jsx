import React from "react";
import { useAuth } from "../context/authContext";
import { Navigate, Outlet } from "react-router-dom";

export default function UserRoute() {
  const { isUser } = useAuth();

  if (!isUser) {
    return <Navigate to={"/login"} replace />;
  }
  return <Outlet />;
}
