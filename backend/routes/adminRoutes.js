import express from 'express';
import RoleController from '../controller/roleController.js';
import UserController from '../controller/userController.js';
import ArticleController from '../controller/articleController.js';
import ProjectController from '../controller/projectContoller.js';
import GalleryController from '../controller/galleryContoller.js';
import PhotoController from '../controller/photoController.js';
import upload from '../config/multerConfig.js';

const adminRoutes = express.Router();

// УПРАВЛЕНИЕ РОЛЯМИ
adminRoutes.get('/role', RoleController.getRoles); // Получить все роли
adminRoutes.post('/role/create', RoleController.createRole); // Создать роль
adminRoutes.post('/role/set', RoleController.setRole); // Назначить роль пользователю
adminRoutes.patch('/role/change/:id', RoleController.changeRoleName); // Изменить название роли
adminRoutes.delete('/role/delete/:id', RoleController.deleteRole); // Удалить роль

// УПРАВЛЕНИЕ ПОЛЬЗОВАТЕЛЯМИ
adminRoutes.patch('/user/change/:id', UserController.changeUser); // Изменить данные пользователя
adminRoutes.patch('/user/avatar/:id', upload.single('avatar'), UserController.changeUserAvatar); // Изменить аватар пользователя
adminRoutes.delete('/user/ban/:id', UserController.banUser); // Забанить пользователя

// УПРАВЛЕНИЕ СТАТЬЯМИ
adminRoutes.post('/article/create', ArticleController.createArticle); // Создать статью
adminRoutes.patch('/article/change/:id', ArticleController.changeArticle); // Изменить статью
adminRoutes.delete('/article/delete/:id', ArticleController.deleteArticle); // Удалить статью

// УПРАВЛЕНИЕ ПРОЕКТАМИ
adminRoutes.post('/project/create',  ProjectController.createProject); // Создать проект
adminRoutes.patch('/project/change/:id', ProjectController.changeProject); // Изменить проект
adminRoutes.delete('/project/delete/:id', ProjectController.deleteProject); // Удалить проект

// УПРАВЛЕНИЕ ГАЛЕРЕЯМИ
adminRoutes.post('/gallery/create', GalleryController.createGallery); // Создать галерею
adminRoutes.patch('/gallery/change/:id', GalleryController.changeGallery); // Изменить галерею
adminRoutes.delete('/gallery/delete/:id', GalleryController.deleteGallery); // Удалить галерею

// УПРАВЛЕНИЕ ФОТОГРАФИЯМИ
adminRoutes.post('/photo/upload', upload.single('image'), PhotoController.uploadPhoto); // Загрузить фотографию
adminRoutes.patch('/photo/change/:id', PhotoController.changePhoto); // Изменить фотографию
adminRoutes.delete('/photo/delete/:id', PhotoController.deletePhoto); // Удалить фотографию

export default adminRoutes;