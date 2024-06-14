// src/components/PublicRoute.js

import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Invalid token");
    return false;
  }
};

const PublicRoute = ({ element: Component, ...rest }) => {
  const { role } = isAuthenticated();

  if (role) {
    // User is logged in, redirect to the appropriate page
    if (role == "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else if (role == "employee") {
      <Navigate to="/User" />;
    } else {
      <Navigate to="/" />;
    }
  }

  // User is not logged in, render the component
  return <Component {...rest} />;
};

export default PublicRoute;
