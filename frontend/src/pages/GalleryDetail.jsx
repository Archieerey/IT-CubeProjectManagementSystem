import { useParams } from "react-router-dom";
import { useGallery } from "../hooks/useGalleries";

const GalleryDetailPage = () => {
  const { id } = useParams();
  const { gallery, loading, error } = useGallery(id);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error.message}</div>;

  return (
    <div>
      <h1>{gallery.name}</h1>
      <p>{gallery.description}</p>
      <h2>Фотографии</h2>
      <ul>
        {gallery.photos.map((photo) => (
          <li key={photo._id}>
            <img src={photo.imageUrl} alt={photo.description} />
            <p>{photo.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GalleryDetailPage;