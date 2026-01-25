import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import authService from '../services/authService';

// Now it accepts a list of allowed roles
const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem('token');
  const user = authService.getCurrentUser();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Check if the user's role is in the list of allowed roles for this route
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If not allowed, send them to a generic "unauthorized" page or back to their own dashboard
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;