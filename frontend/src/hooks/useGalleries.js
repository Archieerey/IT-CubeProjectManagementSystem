import { useState, useEffect } from 'react';
import api from '../api/api';

export const useGalleries = (id = null) => {
  const [gallery, setGallery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const endpoint = id ? `/gallery/${id}` : '/gallery';
        const response = await api.get(endpoint);
        
        if (id) {
          setGallery(response.data);
        } else {
          // Обработка списка галерей
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { gallery, loading, error };
};

