import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AuthResponse, UserData } from '../types/types';
import { validateToken } from '../services/userService';

interface UserContextType {
  user: UserData | null;
  login: (authResponse: AuthResponse) => void;
  logout: () => void;
  isUserLoggedIn: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = (authResponse: AuthResponse) => {
    localStorage.setItem('token', authResponse.token);
    setUser(authResponse.user);
  };

  const checkLoginStatus = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    if (token){
      const loggedIn = await validateToken(token);
      if (loggedIn){
        setIsUserLoggedIn(loggedIn);
        setLoading(false);
      } else {
        setIsUserLoggedIn(false);
        setLoading(false);
      }
    } else {
      setIsUserLoggedIn(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, [user]);


  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, isUserLoggedIn }}>
      {!loading ? children : <div>Loading...</div>}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('Error: useUser must be used within a UserProvider.');
  }
  return context;
};
