import React from 'react';
import { Navigate } from 'react-router-dom';

const Protected = ({ children, path }) => {
  // Check if the user is authenticated
  const token = localStorage.getItem('token');

  // Define paths that should be redirected to profile when the user is authenticated
  const redirectToProfilePaths = ['/', '/login', '/register'];

  if (!token && path.startsWith('/bookings')) {
    // Redirect to the login page if the user is not authenticated and trying to access the profile page
    return <Navigate to="/login" />;
  }

  if (token && redirectToProfilePaths.includes(path)) {
    // Redirect to the profile page if the user is authenticated and trying to access home, login, or register pages
    return <Navigate to="/bookings" />;
  }

  // Allow access to other pages
  return <>{children}</>;
}

export default Protected;
