import React from "react";
import { createContext, useState, useEffect } from "react";

// Create the context
export const AuthContext = createContext();

// AuthProvider to wrap around the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Optional: Load user from localStorage (on refresh)
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Optional: Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Login function (mock)
  const login = (userData) => {
    setUser(userData);
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
