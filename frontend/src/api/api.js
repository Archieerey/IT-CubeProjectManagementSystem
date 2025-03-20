import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3015",
  withCredentials: true,
});

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

export default api;