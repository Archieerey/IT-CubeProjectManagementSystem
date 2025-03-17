import express from 'express';
import handleValidationErrors from '../middleware/handleValidationErrors.js';
import { loginValidation, registerValidation } from '../config/validationConfig.js';
import UserController from '../controller/userController.js';
import jwt from 'jsonwebtoken';

const authRoutes = express.Router();

authRoutes.post('/register', registerValidation, handleValidationErrors, UserController.register);
authRoutes.post('/login', loginValidation, handleValidationErrors, UserController.login);

authRoutes.get('/me', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Токен отсутствует' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      console.log('Декодированный токен:', decoded); // Логируем данные токена
  
      const user = {
        id: decoded.userId,
        email: decoded.email,
        name: decoded.name,
      };
  
      res.json({ user });
    } catch (err) {
      console.error('Ошибка при проверке токена:', err); // Логируем ошибку
      res.status(401).json({ message: 'Недействительный токен' });
    }
  });

export default authRoutes;