import express from 'express';
import handleValidationErrors from '../middleware/handleValidationErrors.js';
import { loginValidation, registerValidation } from '../config/validationConfig.js';
import UserController from '../controller/userController.js';
import jwt from 'jsonwebtoken';
import authCheck from '../middleware/authCheck.js';

const authRoutes = express.Router();

authRoutes.post('/register', registerValidation, handleValidationErrors, UserController.register);
authRoutes.post('/login', loginValidation, handleValidationErrors, UserController.login);
authRoutes.post('/logout', UserController.logout);

authRoutes.get('/me', authCheck, UserController.getMe);

export default authRoutes;