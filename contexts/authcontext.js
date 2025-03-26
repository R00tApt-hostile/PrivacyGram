import React, { createContext, useState, useEffect } from 'react';
import { instagramAuth, logout } from '../utils/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on app load
    const token = localStorage.getItem('instagram_token');
    if (token) {
      verifyToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      // Verify token with your backend or directly with Instagram API
      const userData = await fetchUserData(token);
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Token verification failed:', error);
      localStorage.removeItem('instagram_token');
    } finally {
      setLoading(false);
    }
  };

  const login = async () => {
    try {
      const token = await instagramAuth();
      if (token) {
        localStorage.setItem('instagram_token', token);
        await verifyToken(token);
      }
    } catch (error) {
      console.error('Login failed:', error);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Helper function to fetch user data
async function fetchUserData(token) {
  // In a production app, this would call your backend or Instagram's API
  const response = await fetch(`https://graph.instagram.com/me?fields=id,username&access_token=${token}`);
  if (!response.ok) throw new Error('Failed to fetch user data');
  return response.json();
}
