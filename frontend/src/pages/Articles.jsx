import { Link } from "react-router-dom";
import { useArticles } from "../hooks/useArticles";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import CreateArticleModal from "../components/CreateArticleModal";

const ArticlesPage = () => {
  const { articles, loading, error, fetchArticles } = useArticles();
  const { user } = useContext(AuthContext); // Получаем данные пользователя
  const [isOpenModal, setIsOpenModal] = useState(false);

  if (loading) return <div className="loading" style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>Загрузка...</div>;
  if (error) return <div className="error">Ошибка: {error.message}</div>;

  return (
    <div className="articles-page">
      <div className="container">
        <h1>Статьи</h1>
        {['admin', 'teacher'].includes(user?.role.title) && ( // Проверяем роль
          <button className="button" onClick={() => setIsOpenModal(true)}>
            Создать статью
          </button>
        )}
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
      {isOpenModal && <CreateArticleModal setIsOpenModal={setIsOpenModal} fetchArticles={fetchArticles} />}
    </div>
  );
};

export default ArticlesPage;