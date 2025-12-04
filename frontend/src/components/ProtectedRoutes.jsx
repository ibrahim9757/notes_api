// src/components/ProtectedRoutes.jsx
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes = () => {
  // Check if the JWT token exists in localStorage
  const isAuthenticated = !!localStorage.getItem('jwt_token');

  // If authenticated, render the child routes (Outlet)
  // Otherwise, redirect to the login page
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
