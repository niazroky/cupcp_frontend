// src\components\ProtectedRoute\PrivateRoute.jsx

import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthContext";

/**
 * PrivateRoute Component
 *
 * Protects routes based on authentication status and user roles.
 * - Redirects unauthorized users to login.
 * - Restricts access based on user roles.
 */
const PrivateRoute = ({ allowedRoles }) => {
  const { auth } = useContext(AuthContext) || {};
  
  // Fallback to localStorage in case auth context is not available
  const storedAuth = JSON.parse(localStorage.getItem("auth")) || {};
  const userAuth = auth?.accessToken ? auth : storedAuth;

  // If the user is not authenticated, redirect to login
  if (!userAuth?.accessToken) {
    return <Navigate to="/login" replace />;
  }

  // If roles are restricted and the user's role isn't allowed, redirect to a 403 Forbidden page
  if (allowedRoles && !allowedRoles.includes(userAuth?.role)) {
    return <Navigate to="/forbidden" replace />;
  }

  // Render the protected component if authentication and role check pass
  return <Outlet />;
};

export default PrivateRoute;
