import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:3015',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.code === 'ERR_NETWORK') {
      error.message = 'Проблемы с соединением. Проверьте интернет или попробуйте позже.';
    }
    return Promise.reject(error);
  }
);

// Проекты
export const getProjects = () => api.get("/project/project");
export const getProjectById = (id) => api.get(`/project/project/${id}`);

// Галереи
export const getGalleries = () => api.get("/gallery/gallery");
export const getGalleryById = (id) => api.get(`/gallery/gallery/${id}`);

// Статьи
export const getArticles = () => api.get("/article/article");
export const getArticleById = (id) => api.get(`/article/article/${id}`);
export const createArticle = (data) => api.post('/article/article/create', data) 

// Аутентификация
export const login = (data) => api.post("/auth/login", data);
export const register = (data) => api.post("/auth/register", data);

// api.js
export const createGallery = async (formData) => {
  const response = await fetch('http://localhost:3015/gallery/create', {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Ошибка при создании галереи');
  }
  
  return response.json();
};
export const createProject = async (formData) => {
  const response = await axios.post('/projects', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export default api;

