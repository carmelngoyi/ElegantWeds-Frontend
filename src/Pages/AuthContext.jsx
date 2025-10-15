import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("Auth", JSON.stringify(userData));
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("Auth");
  };

  return (
    <AuthContext.Provider value={{ user, login, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};