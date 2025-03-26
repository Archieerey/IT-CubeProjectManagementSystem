import { useParams } from "react-router-dom";
import { useArticle } from "../hooks/useArticles";

const ArticleDetailPage = () => {
  const { id } = useParams();
  const { article, loading, error } = useArticle(id);

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">Ошибка: {error.message}</div>;

  return (
    <div className="article-detail-page">
      <div className="container">
        <h1>{article.title}</h1>
        <p>{article.content}</p>
        <p>Автор: {article.author?.name}</p>
      </div>
    </div>
  );
};

export default ArticleDetailPage;