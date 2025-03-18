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
      await login(email, password); // Вызываем login из контекста
      navigate('/'); // Перенаправляем на главную страницу
    } catch (err) {
      console.error('Ошибка при входе:', err);
    }
  };

  return (
    <div className="auth-page">
      <div className="container">
        <h2>Вход</h2>

        <form onSubmit={handleSubmit} className="auth-form">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              required
            />
            <label>Пароль:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
            />
          <button type="submit" className="button">Войти</button>
          <p>
            Нет аккаунта? <a href="/register">Зарегистрируйтесь</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;