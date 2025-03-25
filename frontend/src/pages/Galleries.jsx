import { Link } from "react-router-dom";
import { useGalleries } from "../hooks/useGalleries";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import CreateGalleryModal from "../components/CreateGalleryModal";

const GalleriesPage = () => {
  const { galleries, loading, error, fetchGalleries } = useGalleries();
  const { user } = useContext(AuthContext);
  const [isOpenModal, setIsOpenModal] = useState(false);

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">Ошибка: {error.message}</div>;

  return (
    <div className="galleries-page">
      <div className="container">
        <h1>Галереи</h1>
        {['admin', 'teacher'].includes(user?.role.title) && (
          <button className="button" onClick={() => setIsOpenModal(true)}>
            Создать галерею
          </button>
        )}
        <ul className="gallery-list">
          {galleries.map((gallery) => (
            <li key={gallery._id} className="gallery-card">
              <Link to={`/galleries/${gallery._id}`}>
                <h2>{gallery.name}</h2>
                <div className="preview-images">
                  {gallery.photos.slice(0, 3).map((img, index) => (
                    <img key={index} src={img.url} alt={img.name} />
                  ))}
                </div>
              </Link>
              <p>{gallery.description}</p>
            </li>
          ))}
        </ul>
      </div>
      {isOpenModal && <CreateGalleryModal setIsOpenModal={setIsOpenModal} fetchGalleries={fetchGalleries} />}
    </div>
  );
};

export default GalleriesPage;