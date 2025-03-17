import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { config } from "dotenv";

import projectRoutes from './routes/projectRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import photoRoutes from './routes/photoRoutes.js';
import articleRoutes from './routes/articleRoutes.js';
import userRoutes from "./routes/userRoutes.js";
import roleRoutes from "./routes/roleRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import Role from "./models/Role.js";

config({ path: ".env" });

const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL;

// Проверка наличия DATABASE_URL
if (!DATABASE_URL) {
  console.error("Ошибка: DATABASE_URL не указан в .env файле.");
  process.exit(1);
}

// Подключение к MongoDB
mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log("-- MongoDB подключен --");
    initializeRoles(); // Инициализация ролей после подключения к базе данных
  })
  .catch((err) => {
    console.error("Ошибка подключения к MongoDB:", err.message);
    process.exit(1);
  });

// Функция для инициализации ролей
const initializeRoles = async () => {
  try {
    const roles = ["admin", "student", "teacher"];
    for (const roleName of roles) {
      const roleExists = await Role.findOne({ title: roleName });
      if (!roleExists) {
        const newRole = new Role({ title: roleName });
        await newRole.save();
        console.log(`Роль "${roleName}" создана.`);
      }
    }
    console.log("Инициализация ролей завершена.");
  } catch (error) {
    console.error("Ошибка при инициализации ролей:", error.message);
  }
};

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Разрешить запросы с фронтенда
  credentials: true,
}));
// Статическая папка для загрузок
app.use("/uploads", express.static("uploads"));

// Маршруты
app.use('/project', projectRoutes);
app.use('/gallery', galleryRoutes);
app.use('/photo', photoRoutes);
app.use('/article', articleRoutes);
app.use('/user', userRoutes);
app.use('/role', roleRoutes);
app.use('/auth', authRoutes);

// Обработка 404
app.use((req, res) => {
  res.status(404).json({ message: "Маршрут не найден" });
});

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error("Ошибка сервера:", err.message);
  res.status(500).json({ message: "Внутренняя ошибка сервера" });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});