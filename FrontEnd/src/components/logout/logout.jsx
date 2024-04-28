import React, { useEffect } from 'react';
import { useAuth } from '../../context/authcontext';
import { Navigate } from 'react-router-dom';

function Logout() {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <div>
      <Navigate to="/" />
    </div>
  );
}

export default Logout;
