import React, { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/authService";
import { setAccessToken } from "../api/client";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setUser(await authService.fetchCurrentUser());
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();

    const handleLogout = () => setUser(null);
    window.addEventListener("auth:logout", handleLogout);
    return () => window.removeEventListener("auth:logout", handleLogout);
  }, []);

  const login = async (username, password) => {
    const u = await authService.login(username, password);
    setUser(u);
    return u;
  };

  const signUp = async (payload) => {
    const u = await authService.signUp(payload);
    setUser(u);
    return u;
  };

  const logout = async () => {
    await authService.logout();
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, isAuthenticated: !!user, login, signUp, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
