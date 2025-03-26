import { useParams } from "react-router-dom";
import { useGalleries } from "../hooks/useGalleries";

const GalleryDetailPage = () => {
  const { id } = useParams();
  console.log('Gallery ID from URL:', id);
  const { gallery, loading, error } = useGalleries(id);

if (loading) return <div className="loading">Загрузка...</div>;
  if (error) {
    console.error('Error loading gallery:', error);
    return <div className="error">Ошибка: {error.response?.data?.message || error.message}</div>;
  }
  if (!gallery) return <div className="not-found">Галерея не найдена</div>;

  return (
    <div className="gallery-detail-page">
      <div className="container">
        <h1>{gallery.name}</h1>
        <p>{gallery.description}</p>
        
        <div className="photos-grid">
          {gallery.photos?.map((photo) => (
            <div key={photo._id} className="photo-item">
              <img src={`http://localhost:${import.meta.env.VITE_BACKEND_PORT}${photo.url}`} alt={photo.name} />
              {/* <p>{photo.name}</p> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryDetailPage;