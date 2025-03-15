import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

// Проекты
export const getProjects = () => api.get("/project");
export const getProjectById = (id) => api.get(`/project/${id}`);

// Галереи
export const getGalleries = () => api.get("/gallery");
export const getGalleryById = (id) => api.get(`/gallery/${id}`);

// Статьи
export const getArticles = () => api.get("/article");
export const getArticleById = (id) => api.get(`/article/${id}`);

// Аутентификация
export const login = (data) => api.post("/auth/login", data);
export const register = (data) => api.post("/auth/register", data);

export default api;