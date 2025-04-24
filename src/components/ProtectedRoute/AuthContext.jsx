// src\components\ProtectedRoute\AuthContext.jsx

import React, { createContext, useState, useEffect } from "react";

// Create authentication context
export const AuthContext = createContext();

/**
 * AuthProvider Component
 * - Manages authentication state using React Context.
 * - Persists authentication details in localStorage.
 * - Provides login/logout functions to update state.
 */
export const AuthProvider = ({ children }) => {
  // Helper function to get authentication details from localStorage
  const getAuthFromStorage = () => ({
    accessToken: localStorage.getItem("accessToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    role: localStorage.getItem("userRole") || null,
  });

  // Initialize auth state
  const [auth, setAuth] = useState(getAuthFromStorage());

  // Sync localStorage when auth state changes
  useEffect(() => {
    if (auth.accessToken) {
      localStorage.setItem("accessToken", auth.accessToken);
      localStorage.setItem("refreshToken", auth.refreshToken);
      localStorage.setItem("userRole", auth.role);
    } else {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userRole");
    }
  }, [auth]);

  // Function to log in, storing tokens and role in state
  const login = (accessToken, refreshToken, role) => {
    setAuth({ accessToken, refreshToken, role });
  };

  // Function to log out, clearing tokens and role
  const logout = () => {
    setAuth({ accessToken: null, refreshToken: null, role: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
