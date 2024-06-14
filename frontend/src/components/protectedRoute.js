import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const getCurrentRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds

    if (decoded.exp < currentTime) {
      // Token is expired
      localStorage.removeItem("token");
      return null;
    }

    return decoded.role;
  } catch (error) {
    console.error("Invalid token");
    return null;
  }
};

const ProtectedRoute = ({ element: Component, role, ...rest }) => {
  const currentRole = getCurrentRole();
  const location = useLocation();

  if (!currentRole) {
    // Not logged in or token is expired, redirect to login
    return <Navigate to="/login" />;
  }

  if (role && currentRole !== role) {
    // Role not authorized, redirect based on current role
    if (currentRole === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else if (currentRole === "employee") {
      return <Navigate to="/User" />;
    } else {
      return <Navigate to="/" />;
    }
  }

  // Authorized, render the component
  return <Component {...rest} />;
};

export default ProtectedRoute;
