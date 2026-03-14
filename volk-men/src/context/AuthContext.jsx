import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('volk_auth');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('volk_auth', JSON.stringify(user));
  }, [user]);

  const login = (email, password) => {
    // Mock login
    const userData = {
      id: "u123",
      name: "John Doe",
      email: email,
      role: email.includes('admin') ? 'admin' : 'user',
      points: 450,
      credits: 200
    };
    setUser(userData);
    return userData;
  };

  const logout = () => {
    setUser(null);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
