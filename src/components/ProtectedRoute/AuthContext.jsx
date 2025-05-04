// src/components/ProtectedRoute/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";

// Base URL for Django backend API
const BACKEND_URL = "https://cupcp.com/api";

// Create a context for authentication state and actions
export const AuthContext = createContext();

// AuthProvider wraps your app and provides auth-related data/functions
export const AuthProvider = ({ children }) => {
  // Load auth info from localStorage when app loads
  const getAuthFromStorage = () => ({
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
    role: localStorage.getItem("userRole"),
  });

  // Main auth state: access token, refresh token, and user role
  const [auth, setAuth] = useState(getAuthFromStorage());

  // Whenever auth state changes, sync it to localStorage
  useEffect(() => {
    if (auth.accessToken && auth.refreshToken) {
      localStorage.setItem("accessToken", auth.accessToken);
      localStorage.setItem("refreshToken", auth.refreshToken);
      localStorage.setItem("userRole", auth.role);
    } else {
      localStorage.clear(); // Clear storage if user is logged out
    }
  }, [auth]);

  // Auto-refresh access token ~1 minute before expiry
  useEffect(() => {
    if (!auth.accessToken || !auth.refreshToken) return;

    // Decode JWT to get the expiry time (in seconds)
    const payload = JSON.parse(atob(auth.accessToken.split(".")[1]));
    const msUntilExpiry = payload.exp * 1000 - Date.now() - 60_000; // 1 min before expiry

    // Set a timer to refresh token before it expires
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/auth/api/token/refresh/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh: auth.refreshToken }),
        });

        if (!res.ok) throw new Error(`Refresh failed ${res.status}`);
        const data = await res.json();

        // Update accessToken, and if backend returns a rotated refreshToken, update it too
        setAuth(prev => ({
          ...prev,
          accessToken: data.access,
          refreshToken: data.refresh || prev.refreshToken,
        }));
      } catch (err) {
        console.error("[AutoRefresh] error:", err);
        // On refresh failure, log user out
        setAuth({ accessToken: null, refreshToken: null, role: null });
      }
    }, Math.max(msUntilExpiry, 0)); // Avoid negative timeout if time has passed

    // Clear timer on cleanup
    return () => clearTimeout(timer);
  }, [auth]);

  // Login: store new access/refresh tokens and user role
  const login = (accessToken, refreshToken, role) => {
    setAuth({ accessToken, refreshToken, role });
  };

  // Logout: call backend logout endpoint and clear auth state
  const logout = async () => {
    try {
      await fetch(`${BACKEND_URL}/auth/logout/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
        body: JSON.stringify({ refresh: auth.refreshToken }),
      });
    } catch (e) {
      console.error("Logout API error", e);
    }

    // Clear auth state and localStorage
    setAuth({ accessToken: null, refreshToken: null, role: null });
  };

  // Provide auth state and actions to entire app
  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
