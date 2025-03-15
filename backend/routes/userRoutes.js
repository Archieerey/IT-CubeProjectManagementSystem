import express from 'express';
import UserController from '../controller/userController.js';
import upload from '../config/multerConfig.js';

const userRoutes = express.Router();

userRoutes.get('/user', UserController.getAllUsers);
userRoutes.get('/user/:id', UserController.getUserById);
userRoutes.patch('/user/change/:id', UserController.changeUser);
userRoutes.patch('/user/avatar/:id', upload.single('avatar'), UserController.changeAvatar);
userRoutes.delete('/user/ban/:id', UserController.banUser);

export default userRoutes;