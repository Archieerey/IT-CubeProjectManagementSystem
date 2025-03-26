import Client from "../models/User.js";
import Genre from "../models/Genre.js";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Record from "../models/Record.js";

import fs from "fs";
import path from "path";

class AdminController {
  // СОЗДАНИЕ ЖАНРА
  static async createGenre(req, res) {
    try {
      const { title } = req.body;

      const newGenre = new Genre({
        title,
      });

      const savedGenre = await newGenre.save();

      return res
        .status(200)
        .json({ message: "Жанр успешно создан", savedGenre });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // ИЗМЕНЕНИЕ ЖАНРА
  static async changeGenre(req, res) {
    try {
      const { title } = req.body;
      const id = req.params.id;

      const selectedGenre = Genre.findById(id);

      if (!selectedGenre) {
        return res.status(404).json({ message: "Жанр не найден" });
      }

      selectedGenre.title = title;

      const updatedGenre = await selectedGenre.save();

      return res
        .status(200)
        .json({ message: "Жанр успешно обновлен", updatedGenre });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // ИЗМЕНЕНИЕ АККАУНТА ПОЛЬЗОВАТЕЛЯ
  static async changeClientAccount(req, res) {
    try {
      const clientId = req.params.id;
      const { name, email, telephone, avatar } = req.body;

      const client = await Client.findById(clientId);
      if (!client) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      if (name) client.name = name;
      if (email) client.email = email;
      if (telephone) client.telephone = telephone;
      if (avatar) client.avatar = avatar;

      await client.save();

      res
        .status(200)
        .json({ message: "Данные пользователя успешно обновлены", client });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // ИЗМЕНЕНИЕ АВАТАРКИ ПОЛЬЗОВАТЕЛЯ
  static async changeClientAvatar(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Аватарка не загружена!" });
      }

      const clientId = req.params.id;

      const client = await Client.findById(clientId);
      if (!client) {
        return res.status(404).json({ message: "Клиент не найден!" });
      }

      const avatarPath = `/uploads/avatars/${req.file.filename}`;

      if (client.avatar !== "/uploads/avatars/default.jpg") {
        const oldAvatarPath = path.join(__dirname, "..", client.avatar);
        fs.unlinkSync(oldAvatarPath);
      }

      client.avatar = avatarPath;
      await client.save();

      return res.status(200).json({
        message: "Аватарка успешно обновлена!",
        avatar: avatarPath,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  }

  // УДАЛЕНИЕ ПОЛЬЗОВАТЕЛЯ
  static async clientBan(req, res) {
    try {
      const clientId = req.params.id;

      const client = await Client.findById(clientId);
      if (!client) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      if (client.cart_id) {
        await Cart.findByIdAndDelete(client.cart_id);
      }

      await Record.deleteMany({ artist_id: clientId });

      await Client.findByIdAndDelete(clientId);

      return res
        .status(200)
        .json({ message: "Пользователь, его корзина и треки успешно удалены" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  }

  // ВЫВОД ВСЕХ ЗАКАЗОВ
  static async getAllOrders(req, res) {
    try {
      const orders = await Order.find()
        .populate("cart_id")
        .sort({ order_date: -1 });

      return res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  }

  // ВЫВОД ЗАКАЗА ПО ID
  static async getOrderById(req, res) {
    try {
      const orderId = req.params.id;

      const order = await Order.findById(orderId).populate("cart_id");
      if (!order) {
        return res.status(404).json({ message: "Заказ не найден" });
      }

      return res.status(200).json(order);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  }

  // ПРИНЯТИЕ ЗАКАЗА
  static async acceptOrder(req, res) {
    try {
      const orderId = req.params.id;

      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: "Заказ не найден" });
      }

      order.order_status = "Принят";
      await order.save();

      return res.status(200).json({ message: "Заказ успешно принят", order });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  }

  // ОТМЕНА ЗАКАЗА
  static async rejectOrder(req, res) {
    try {
      const orderId = req.params.id;

      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: "Заказ не найден" });
      }

      order.order_status = "Отменен";
      await order.save();

      return res.status(200).json({ message: "Заказ успешно отменен", order });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  }

  // ВЫВОД ВСЕХ ПЛАСТИНОК
  static async getAllRecords(req, res) {
    try {
      const records = await Record.find()
        .populate("artist_id")
        .populate("genre_id")
        .sort({ release_date: -1 });

      return res.status(200).json(records);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  }

  // ВЫВОД ПЛАСТИНКИ ПО ID
  static async getRecordById(req, res) {
    try {
      const recordId = req.params.id;

      const record = await Record.findById(recordId)
        .populate("artist_id")
        .populate("genre_id");
      if (!record) {
        return res.status(404).json({ message: "Пластинка не найдена" });
      }

      return res.status(200).json(record);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  }

  // ИЗМЕНЕНИЕ ПЛАСТИНКИ
  static async changeRecord(req, res) {
    try {
      const recordId = req.params.id;
      const { title, price, release_date, artist_id, genre_id } = req.body;

      const record = await Record.findById(recordId);
      if (!record) {
        return res.status(404).json({ message: "Пластинка не найдена" });
      }
      
      if (title) record.title = title;
      if (price) record.price = price;
      if (release_date) record.release_date = release_date;
      if (artist_id) record.artist_id = artist_id;
      if (genre_id) record.genre_id = genre_id;

      await record.save();

      return res
        .status(200)
        .json({ message: "Пластинка успешно обновлена", record });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  }

  // ИЗМЕНЕНИЕ ОБЛОЖКИ ПЛАСТИНКИ
  static async changeRecordCover(req, res) {
    try {
      const recordId = req.params.id;

      if (!req.file) {
        return res.status(400).json({ message: "Обложка не загружена" });
      }

      const record = await Record.findById(recordId);
      if (!record) {
        return res.status(404).json({ message: "Пластинка не найдена" });
      }

      if (
        record.track_cover &&
        record.track_cover !== "/uploads/track_covers/default.jpg"
      ) {
        const oldCoverPath = path.join(__dirname, "..", record.track_cover);
        fs.unlinkSync(oldCoverPath);
      }

      const newCoverPath = `/uploads/track_covers/${req.file.filename}`;
      record.track_cover = newCoverPath;
      await record.save();

      return res
        .status(200)
        .json({
          message: "Обложка пластинки успешно обновлена",
          cover: newCoverPath,
        });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  }

  // УДАЛЕНИЕ ПЛАСТИНКИ
  static async deleteRecord(req, res) {
    try {
      const recordId = req.params.id;

      const record = await Record.findById(recordId);
      if (!record) {
        return res.status(404).json({ message: "Пластинка не найдена" });
      }

      if (
        record.track_cover &&
        record.track_cover !== "/uploads/track_covers/default.jpg"
      ) {
        const coverPath = path.join(__dirname, "..", record.track_cover);
        fs.unlinkSync(coverPath);
      }

      await Record.findByIdAndDelete(recordId);

      return res.status(200).json({ message: "Пластинка успешно удалена" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  }
}

export default AdminController;
