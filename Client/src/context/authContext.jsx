import { createContext, useContext, useState } from "react";
import { loginUser, logoutUser, registerUser } from "../api/user";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used in a provider");
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (data) => {
    try {
      setLoading(true);
      const res = await loginUser(data);
      if (res.ok) {
        setUser(res.data);
        navigate("/");
      } else {
        setError(true);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const register = async (data) => {
    try {
      setLoading(true);
      const res = await registerUser(data);
      if (res.ok) {
        setUser(res.data);
        navigate("/");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const res = await logoutUser();
      if (res.ok) {
        setUser(null);
        navigate("/");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const isAdmin = () => {
    if (user.role === "admin") return true;
    else return false;
  };

  const isUser = () => {
    if (user.role === "user") return true;
    else return false;
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    error,
    isAdmin,
    isUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
