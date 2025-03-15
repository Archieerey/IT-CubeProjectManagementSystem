import express from 'express';
import handleValidationErrors from '../middleware/handleValidationErrors.js';
import { loginValidation, registerValidation } from '../config/validationConfig.js';
import UserController from '../controller/userController.js';

const authRoutes = express.Router();

authRoutes.post('/register', registerValidation, handleValidationErrors, UserController.register);
authRoutes.post('/login', loginValidation, handleValidationErrors, UserController.login);

export default authRoutes;