import { useParams } from "react-router-dom";
import { useArticle } from "../hooks/useArticles";

const ArticleDetailPage = () => {
  const { id } = useParams();
  const { article, loading, error } = useArticle(id);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error.message}</div>;

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
      <p>Автор: {article.author?.name}</p>
    </div>
  );
};

export default ArticleDetailPage;