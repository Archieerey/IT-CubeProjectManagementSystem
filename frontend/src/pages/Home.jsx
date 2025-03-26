import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="container">
        <h1>Добро пожаловать в IT-Куб!</h1>
        <p>Систематизация проектов и мероприятий.</p>
        <div className="links">
          <Link to="/projects" className="button">Посмотреть проекты</Link>
          <Link to="/galleries" className="button">Посмотреть галереи</Link>
          <Link to="/articles" className="button">Посмотреть статьи</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;