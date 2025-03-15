import { Link } from "react-router-dom";
import { useGalleries } from "../hooks/useGalleries";

const GalleriesPage = () => {
  const { galleries, loading, error } = useGalleries();

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error.message}</div>;

  return (
    <div>
      <h1>Галереи</h1>
      <ul>
        {galleries.map((gallery) => (
          <li key={gallery._id}>
            <Link to={`/galleries/${gallery._id}`}>
              <h2>{gallery.name}</h2>
            </Link>
            <p>{gallery.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GalleriesPage;