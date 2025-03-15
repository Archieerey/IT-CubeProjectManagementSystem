import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>Добро пожаловать в IT-Куб!</h1>
      <p>Систематизация проектов и мероприятий.</p>
      <Link to="/projects">Посмотреть проекты</Link>
      <Link to="/galleries">Посмотреть галереи</Link>
      <Link to="/articles">Посмотреть статьи</Link>
    </div>
  );
};

export default HomePage;