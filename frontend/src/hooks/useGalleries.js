import { useEffect, useState } from "react";
import { getGalleries, getGalleryById } from "../api/api";

export const useGalleries = () => {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const response = await getGalleries();
        setGalleries(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleries();
  }, []);

  return { galleries, loading, error };
};

