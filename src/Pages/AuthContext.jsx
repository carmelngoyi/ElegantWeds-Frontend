import React, { createContext, useState } from 'react';



export const AuthContext = createContext({
    user: null,
    login: () => {}, 
    signOut: () => {},
});

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
      const storedUser = localStorage.getItem("Auth");
      return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("Auth", JSON.stringify(userData)); 
        console.log("User logged in:", userData.email);
    };

    const signOut = () => {
        setUser(null);
        localStorage.removeItem("Auth"); 
        console.log("User signed out.");
    };

    return (
        <AuthContext.Provider value={{ user, login, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};