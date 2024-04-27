import React from 'react';
import { Navigate } from 'react-router-dom';

const Protected = ({ children, path }) => {
  // Check if the user is authenticated
  const token = localStorage.getItem('token');

  // If there's no token and the user is trying to access protected routes, redirect to login
  if (!token && (path !== '/' && path !== '/about' && path !== '/services' && path !== '/contact' && path !== '/login' && path !== '/register')) {
    return <Navigate to="/login" />;
  }

  // If there is a token and the user is trying to access '/' or '/about' or '/services' or '/contact' or '/login' or '/register', redirect to '/bookings'
  if (token && (path === '/' || path === '/about' || path === '/services' || path === '/contact' || path === '/login' || path === '/register')) {
    return <Navigate to="/bookings" />;
  }

  // Allow access to other pages
  return <>{children}</>;
}



export default Protected;
