import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Главная</Link>
      <Link to="/projects">Проекты</Link>
      <Link to="/galleries">Галереи</Link>
      <Link to="/articles">Статьи</Link>
      <Link to="/login">Войти</Link>
      <Link to="/register">Регистрация</Link>
    </nav>
  );
};

export default Navbar;