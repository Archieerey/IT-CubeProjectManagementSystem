// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // При монтировании компонента проверяем токен
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       fetchUserData(token);
//     }
//   }, []);

//   // Функция для загрузки данных пользователя
//   const fetchUserData = async (token) => {
//     try {
//       const response = await axios.get('http://localhost:3015/auth/me', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       console.log('Ответ от сервера:', response);
//       setUser(response.data.user); // Устанавливаем данные пользователя
//     } catch (err) {
//       console.error('Ошибка при загрузке данных пользователя:', err);
//       localStorage.removeItem('token'); // Удаляем токен, если он недействителен
//     }
//   };

//   // Функция для входа
//   const login = async (token) => {
//     localStorage.setItem('token', token); // Сохраняем токен
//     await fetchUserData(token); // Ждём завершения загрузки данных пользователя
//   };

//   // Функция для выхода
//   const logout = () => {
//     localStorage.removeItem('token'); // Удаляем токен
//     setUser(null); // Сбрасываем данные пользователя
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // При монтировании компонента проверяем токен
  useEffect(() => {
    fetchUserData();
  }, []);

  // Функция для загрузки данных пользователя
  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:3015/auth/me', {
        withCredentials: true, // Включаем передачу кук
      });

      console.log('Ответ от сервера:', response);
      setUser(response.data.user);
    } catch (err) {
      console.error('Ошибка при загрузке данных пользователя:', err);
      setUser(null);
    }
  };

  // Функция для входа
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        'http://localhost:3015/auth/login',
        { email, password },
        { withCredentials: true } // Включаем передачу кук
      );

      console.log('Ответ от сервера:', response);
      await fetchUserData(); // Загружаем данные пользователя
    } catch (err) {
      console.error('Ошибка при входе:', err);
    }
  };

  // Функция для выхода
  const logout = async () => {
    try {
      await axios.post('http://localhost:3015/auth/logout', {}, { withCredentials: true });
      setUser(null); // Сбрасываем данные пользователя
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