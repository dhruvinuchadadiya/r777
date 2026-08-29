import React, { createContext, useContext, useEffect, useState } from "react";
import { authService } from "@/core/services/authService";
import { setAccessToken } from "@/core/api/client";
import { STORAGE_KEYS } from "@/core/constants/storageKeys";

const AuthContext = createContext(null);

// Only ever read/write NON-sensitive display fields here.
// Never store sessionToken or any credential in sessionStorage/localStorage.
const readStoredUser = () => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEYS.USER);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const writeStoredUser = (user) => {
  try {
    if (!user) {
      sessionStorage.removeItem(STORAGE_KEYS.USER);
      return;
    }
    const { sessionToken, ...safeUser } = user; // strip the token before persisting
    sessionStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(safeUser));
  } catch {
    // sessionStorage may be unavailable (private browsing etc.) — fail silently
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Stopgap: restore display-only state from sessionStorage until a real
    // /auth/Me endpoint is confirmed with the backend team.
    const stored = readStoredUser();
    if (stored) {
      setUser(stored);
    }
    setLoading(false);

    const handleForcedLogout = () => {
      setUser(null);
      writeStoredUser(null);
    };
    window.addEventListener("auth:logout", handleForcedLogout);
    return () => window.removeEventListener("auth:logout", handleForcedLogout);
  }, []);

  const login = async (username, password) => {
    const loggedInUser = await authService.login(username, password);
    setUser(loggedInUser);
    writeStoredUser(loggedInUser);
    return loggedInUser;
  };

  const signUp = async (payload) => {
    const newUser = await authService.signUp(payload);
    setUser(newUser);
    writeStoredUser(newUser);
    return newUser;
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error("Logout request failed:", err);
    } finally {
      setAccessToken(null);
      setUser(null);
      writeStoredUser(null);
    }
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
