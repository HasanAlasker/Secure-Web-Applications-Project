import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, logoutUser, registerUser, getMe } from "../api/user";
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
  const [status, setStatus] = useState(null);
  const [errMsg, setErrMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await getMe();
        if (res.ok) {
          setUser(res.data);
        }
      } catch (error) {
        console.log("Not authenticated");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (data) => {
    try {
      setLoading(true);
      setError(false);
      setStatus(null);

      const res = await loginUser(data);

      if (res.ok) {
        setUser(res.data);
        navigate("/");
        return { ok: true, status: res.status };
      } else {
        setError(true);
        setStatus(res.status);
        setErrMsg(res.error);
        return { ok: false, status: res.status };
      }
    } catch (error) {
      setError(true);
      return { ok: false, status: null };
    } finally {
      setLoading(false);
    }
  };

  const register = async (data) => {
    try {
      setLoading(true);
      setError(false);
      const res = await registerUser(data);
      if (res.ok) {
        setUser(res.data);
        navigate("/");
        return { ok: true, status: res.status };
      } else {
        setError(true);
        setStatus(res.status);
        setErrMsg(res.error);
        return { ok: false, status: res.status };
      }
    } catch (error) {
      setError(true);
      return { ok: false, status: null };
    } finally {
      setLoading(false);
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
      setLoading(false);
    }
  };

  const isAdmin = user?.role === "admin";

  const isUser = user?.role === "user";

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    error,
    isAdmin,
    isUser,
    errMsg,
    status,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
