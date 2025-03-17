import User from "../models/User.js";
import Project from "../models/Project.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Role from "../models/Role.js";
import fs from "fs";
import path from "path";

class UserController {
  static async register(req, res) {
    try {
      const { name, email, password, role } = req.body;

      const defaultRole = await Role.findOne({ title: "student" });
      if (!defaultRole) {
        return res.status(404).json({ message: "Роль 'student' не найдена!" });
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const newUser = new User({
        name,
        email,
        password: hash,
        role: role || defaultRole._id,
      });

      const savedUser = await newUser.save();

      const token = jwt.sign(
        { _id: savedUser._id },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
      );

      const { password: _, ...userData } = savedUser._doc;

      res.status(201).json({
        ...userData,
        token,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Не удалось зарегистрироваться" });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).populate("role");
      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      const isValidPass = await bcrypt.compare(password, user.password);
      if (!isValidPass) {
        return res.status(400).json({ message: "Неверный пароль" });
      }

      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          name: user.name,
        },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
      );

      const { password: _, ...userData } = user._doc;

      res.status(200).json({
        ...userData,
        token,
      });
    } catch (err) {
      console.error(err);
      console.log(err);
      res.status(500).json({ message: "Ошибка при авторизации" });
    }
  }

  static async changeUser(req, res) {
    try {
      const { id } = req.params;
      const { name, email, role } = req.body;

      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      if (name) user.name = name;
      if (email) user.email = email;
      if (role) user.role = role;

      const updatedUser = await user.save();

      const { password: _, ...userData } = updatedUser._doc;

      res.status(200).json(userData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Ошибка при обновлении данных" });
    }
  }

  static async changeAvatar(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Аватар не загружен" });
      }

      const { id } = req.params;
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      if (user.avatar !== "/uploads/avatars/default.jpg") {
        const oldAvatarPath = path.join(__dirname, "..", user.avatar);
        fs.unlinkSync(oldAvatarPath);
      }

      const avatarPath = `/uploads/avatars/${req.file.filename}`;
      user.avatar = avatarPath;
      await user.save();

      res.status(200).json({ message: "Аватар успешно обновлён", avatar: avatarPath });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Ошибка при обновлении аватара" });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await User.find().select("-password").populate("role");
      res.status(200).json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Ошибка при получении пользователей" });
    }
  }

  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id).select("-password").populate("role");

      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Ошибка при получении пользователя" });
    }
  }

  static async deleteUser(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      if (user.avatar !== "/uploads/avatars/default.jpg") {
        const avatarPath = path.join(__dirname, "..", user.avatar);
        fs.unlinkSync(avatarPath);
      }

      res.status(200).json({ message: "Пользователь успешно удалён" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Ошибка при удалении пользователя" });
    }
  }

  static async banUser(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      user.isBanned = true;
      await user.save();

      res.status(200).json({ message: "Пользователь успешно заблокирован" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Ошибка при блокировке пользователя" });
    }
  }

  static async getUserProjects(req, res) {
    try {
      const { id } = req.params;

      const projects = await Project.find({ student: id }).populate("instructor");
      res.status(200).json(projects);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Ошибка при получении проектов" });
    }
  }
}

export default UserController;