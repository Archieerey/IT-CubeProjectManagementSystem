import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:3015/auth/me', {
        withCredentials: true,
      });

      setUser(response.data.user);
    } catch (err) {
      console.error('Ошибка при загрузке данных пользователя:', err);
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        'http://localhost:3015/auth/login',
        { email, password },
        { withCredentials: true }
      );

      await fetchUserData();
    } catch (err) {
      console.error('Ошибка при входе:', err);
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3015/auth/logout',
        {},
        { withCredentials: true }
      );
  
      console.log('Ответ от сервера:', response);
      setUser(null);
    } catch (err) {
      console.error('Ошибка при выходе:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};