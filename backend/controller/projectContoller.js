import Project from "../models/Project.js";

class ProjectController {
  // СОЗДАНИЕ ПРОЕКТА
  static async createProject(req, res) {
    try {
      const { title, description, category, student, instructor } = req.body;

      const newProject = new Project({
        title,
        description,
        category,
        student,
        instructor,
      });

      await newProject.save();
      return res.status(200).json({ message: "Проект успешно создан!", project: newProject });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // ПОЛУЧЕНИЕ ВСЕХ ПРОЕКТОВ
  static async getAllProjects(req, res) {
    try {
      const projects = await Project.find().populate("student instructor");
      return res.status(200).json(projects);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // ПОЛУЧЕНИЕ ПРОЕКТА ПО ID
  static async getProjectById(req, res) {
    try {
      const { id } = req.params;
      const project = await Project.findById(id).populate("student instructor");
      if (!project) {
        return res.status(404).json({ message: "Проект не найден!" });
      }
      return res.status(200).json(project);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // ОБНОВЛЕНИЕ ПРОЕКТА
  static async updateProject(req, res) {
    try {
      const { id } = req.params;
      const { title, description, category } = req.body;

      const project = await Project.findByIdAndUpdate(
        id,
        { title, description, category },
        { new: true }
      );

      if (!project) {
        return res.status(404).json({ message: "Проект не найден!" });
      }

      return res.status(200).json({ message: "Проект успешно обновлен!", project });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // УДАЛЕНИЕ ПРОЕКТА
  static async deleteProject(req, res) {
    try {
      const { id } = req.params;
      const project = await Project.findByIdAndDelete(id);
      if (!project) {
        return res.status(404).json({ message: "Проект не найден!" });
      }
      return res.status(200).json({ message: "Проект успешно удален!" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default ProjectController;