import { Link } from "react-router-dom";
import { useArticles } from "../hooks/useArticles";

const ArticlesPage = () => {
  const { articles, loading, error } = useArticles();

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">Ошибка: {error.message}</div>;

  return (
    <div className="articles-page">
      <div className="container">
        <h1>Статьи</h1>
        <ul className="article-list">
          {articles.map((article) => (
            <li key={article._id} className="article-card">
              <Link to={`/articles/${article._id}`}>
                <h2>{article.title}</h2>
              </Link>
              <p>{article.content.substring(0, 100)}...</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ArticlesPage;