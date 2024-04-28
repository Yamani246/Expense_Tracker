import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/authcontext';

function PrivateRoute() {
  const { isAuthenticated } = useAuth(); 
  
  return (
    <div>
      {isAuthenticated ? <Outlet /> : <Navigate to="login" />}
    </div>
  );
}

export default PrivateRoute;
