import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context object
const UserContext = createContext();

// Custom provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Retrieve user data from local storage if available
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Update local storage whenever user data changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
    console.log(user);
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to consume UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
