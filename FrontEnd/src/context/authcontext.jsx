// AuthContext.js

import React, { createContext, useContext, useEffect, useState } from 'react';
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false); // Mark loading as complete
  }, []);

  const login = async() => {
    try{
    setIsAuthenticated(true);
    }
    catch(error){
      console.error('Error occurred during login:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token')
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout,isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
