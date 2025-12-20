import { createContext, useContext, useState } from "react";
import { loginUser, logoutUser, registerUser } from "../api/user";

export const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used in a provider");
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (data) => {
    try {
      setLoading(true);
      const res = await loginUser(data);
      if (res.ok) setUser(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const register = async (data) => {
    try {
      setLoading(true);
      const res = await registerUser(data);
      if (res.ok) setUser(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const res = await logoutUser();
      if (res.ok) setUser(null);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
