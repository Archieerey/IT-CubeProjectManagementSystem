import Client from "../models/User.js";
import Role from "../models/Role.js";

class RoleController {
  // ПРОСМОТР ВСЕХ РОЛЕЙ
  static async getRoles(req, res) {
    try {
      const roles = await Role.find(); // Добавляем await

      return res.status(200).json({ roles });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  
  // СОЗДАНИЕ РОЛИ
  static async createRole(req, res) {
    try {
      const { title, description } = req.body;

      const newRole = new Role({
        title,
        description,
      });

      await newRole.save();
      return res.status(200).json({ message: "Роль успешно создана!", role: newRole }); // Возвращаем созданную роль
    } catch (error) {
      return res.status(404).json({ message: error.message }); // Исправляем возврат ошибки
    }
  }

  // СОЗДАНИЕ РОЛЕЙ
  static async buildServer(req, res) {
    try {
      const ar = ['admin', 'student', 'teacher'];
      await Promise.all(ar.map(async el => { // Используем Promise.all для параллельного выполнения
        const newRole = new Role({
          title: el
        });
        await newRole.save();
      }));
      return res.status(200).json({ message: "Роли были созданы" });

    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // ИЗМЕНЕНИЕ РОЛИ
  static async changeRoleName(req, res) {
    try {
      const { name } = req.body;
      const id = req.params.id;

      const role = await Role.findById(id);

      if (!role) {
        return res.status(404).json({ message: "Роль не найдена!" });
      }

      if (role.title === name) { // Исправляем на role.title
        return res
          .status(400)
          .json({ message: "Новое имя роли совпадает с текущим." });
      }

      role.title = name;
      const updatedRole = await role.save();

      return res
        .status(200)
        .json({ message: "Имя роли успешно обновлено", role: updatedRole });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // ВЫДАЧА РОЛИ ДРУГОМУ ПОЛЬЗОВАТЕЛЮ
  static async setRole(req, res) {
    try {
      const { client_id, role_id } = req.body;

      const client = await Client.findById(client_id);

      if (!client) {
        return res.status(404).json({ message: "Пользователь не найден!" });
      }

      const role = await Role.findById(role_id);

      if (!role) {
        return res.status(404).json({ message: "Роль не найдена!" });
      }

      const updatedUser = await Client.findByIdAndUpdate(
        client_id,
        { role: role_id },
        { new: true }
      );

      return res
        .status(200)
        .json({ message: "Роль успешно назначена", client: updatedUser });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default RoleController;