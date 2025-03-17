import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const backendUrl = `http://localhost:${import.meta.env.VITE_BACKEND_PORT}`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backendUrl}/auth/register`, {
        name,
        email,
        password,
      });

      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (err) {
      setError('Ошибка при регистрации');
    }
  };

  return (
    <div className="auth-page">
      <div className="container">
        <h2>Регистрация</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} className="auth-form">
          <div>
            <label>Имя:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              required
            />
          </div>
          <div>
            <label>Пароль:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
            />
          </div>
          <button type="submit" className="button">Зарегистрироваться</button>
        </form>
        <p>
          Уже есть аккаунт? <a href="/login">Войдите</a>
        </p>
      </div>
    </div>
  );
};

export default Register;