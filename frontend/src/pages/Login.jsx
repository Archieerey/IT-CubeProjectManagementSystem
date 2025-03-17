// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { AuthContext } from '../context/AuthContext.jsx';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext);

//   const backendUrl = `http://localhost:${import.meta.env.VITE_BACKEND_PORT}`;

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(`${backendUrl}/auth/login`, {
//         email,
//         password,
//       });

//       // Сохраняем токен в localStorage
//       localStorage.setItem('token', response.data.token);

//       // Сохраняем данные пользователя в контексте
//       login(response.data.user);

//       // Перенаправляем на главную страницу
//       navigate('/');
//     } catch (err) {
//       if (err.response) {
//         setError(err.response.data.message || 'Ошибка при авторизации');
//       } else {
//         setError('Ошибка сети. Проверьте подключение к интернету.');
//       }
//     }
//   };

//   return (
//     <div className="auth-page">
//       <div className="container">
//         <h2>Вход</h2>
//         {error && <p className="error">{error}</p>}
//         <form onSubmit={handleSubmit} className="auth-form">
//           <div>
//             <label>Email:</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="input"
//               required
//             />
//           </div>
//           <div>
//             <label>Пароль:</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="input"
//               required
//             />
//           </div>
//           <button type="submit" className="button">Войти</button>
//         </form>
//         <p>
//           Нет аккаунта? <a href="/register">Зарегистрируйтесь</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3015/auth/login', {
        email,
        password,
      });

      console.log('Ответ от сервера:', response);
      if (response.data.token) {
        await login(response.data.token); // Ждём завершения входа
        navigate('/'); // Перенаправляем на главную страницу
      }
    } catch (err) {
      console.error('Ошибка при входе:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Войти</button>
    </form>
  );
};

export default Login;