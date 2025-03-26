import { useState, useEffect } from 'react';
import api, { getGalleries, getGalleryById } from '../api/api';

export const useGalleries = (id = null) => {
  const [gallery, setGallery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = id ? await getGalleryById(id) : await getGalleries();
        setGallery(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const fetchGalleries = async () => {
    try {
      setLoading(true)
      const response = await getGalleries();
      setGallery(response.data);
    } catch (error) {
      return false
    } finally {
      setLoading(false)
    }
  }
  return { gallery, loading, error, fetchGalleries };
};

