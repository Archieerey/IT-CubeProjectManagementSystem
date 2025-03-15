import { Link } from "react-router-dom";
import { useGalleries } from "../hooks/useGalleries";

const GalleriesPage = () => {
  const { galleries, loading, error } = useGalleries();

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">Ошибка: {error.message}</div>;

  return (
    <div className="galleries-page">
      <div className="container">
        <h1>Галереи</h1>
        <ul className="gallery-list">
          {galleries.map((gallery) => (
            <li key={gallery._id} className="gallery-card">
              <Link to={`/galleries/${gallery._id}`}>
                <h2>{gallery.name}</h2>
              </Link>
              <p>{gallery.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GalleriesPage;