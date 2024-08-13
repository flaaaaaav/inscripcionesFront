import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
//import { Auth } from '../auth';

const ProtectedRoute: React.FC = () => {
  const storedIsLogged = localStorage.getItem('isLogged') === 'true';
  const isLogged = storedIsLogged;

  return isLogged ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
