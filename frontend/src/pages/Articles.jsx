import { Link } from "react-router-dom";
import { useArticles } from "../hooks/useArticles";

const ArticlesPage = () => {
  const { articles, loading, error } = useArticles();

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error.message}</div>;

  return (
    <div>
      <h1>Статьи</h1>
      <ul>
        {articles.map((article) => (
          <li key={article._id}>
            <Link to={`/articles/${article._id}`}>
              <h2>{article.title}</h2>
            </Link>
            <p>{article.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticlesPage;