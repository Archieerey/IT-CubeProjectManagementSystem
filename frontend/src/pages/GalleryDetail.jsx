import { useParams } from "react-router-dom";
// import { useGallery } from "../hooks/useGalleries";

const GalleryDetailPage = () => {
  const { id } = useParams();
  const { gallery, loading, error } = useGallery(id);

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">Ошибка: {error.message}</div>;

  return (
    <div className="gallery-detail-page">
      <div className="container">
        <h1>{gallery.name}</h1>
        <p>{gallery.description}</p>
        <h2>Фотографии</h2>
        <ul className="photo-list">
          {gallery.photos.map((photo) => (
            <li key={photo._id} className="photo-card">
              <img src={photo.imageUrl} alt={photo.description} />
              <p>{photo.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GalleryDetailPage;