import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">My App</Link>
        <div className="navbar-links">
          {user ? (
            <>
              <span>Привет, {user.name}!</span>
              <button onClick={logout} className="button">Выйти</button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">Вход</Link>
              <Link to="/register" className="navbar-link">Регистрация</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;