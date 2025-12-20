import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login.Jsx";
import Admin from "./pages/Admin";
import Users from "./pages/Users";
import { AuthProvider } from "./context/authContext";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/me" element={<Users />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
