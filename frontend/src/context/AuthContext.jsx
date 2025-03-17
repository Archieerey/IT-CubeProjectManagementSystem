import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // При монтировании компонента проверяем токен
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserData(token);
    }
  }, []);

  // Функция для загрузки данных пользователя
  const fetchUserData = async (token) => {
    try {
      const response = await axios.get('http://localhost:3015/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Ответ от сервера:', response);
      setUser(response.data.user); // Устанавливаем данные пользователя
    } catch (err) {
      console.error('Ошибка при загрузке данных пользователя:', err);
      localStorage.removeItem('token'); // Удаляем токен, если он недействителен
    }
  };

  // Функция для входа
  const login = async (token) => {
    localStorage.setItem('token', token); // Сохраняем токен
    await fetchUserData(token); // Ждём завершения загрузки данных пользователя
  };

  // Функция для выхода
  const logout = () => {
    localStorage.removeItem('token'); // Удаляем токен
    setUser(null); // Сбрасываем данные пользователя
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};