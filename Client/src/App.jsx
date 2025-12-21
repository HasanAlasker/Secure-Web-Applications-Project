import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminRoute from "./components/AdminRoute";
import AuthRoute from "./components/AuthRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Users from "./pages/Users";
import { AuthProvider } from "./context/authContext";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<Admin />} />
          </Route>

          <Route element={<AuthRoute />}>
            <Route path="/me" element={<Users />} />
          </Route>

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
