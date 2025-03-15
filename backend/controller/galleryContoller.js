import Gallery from "../models/Gallery.js";

class GalleryController {
  // СОЗДАНИЕ ГАЛЕРЕИ
  static async createGallery(req, res) {
    try {
      const { name, description } = req.body;

      const newGallery = new Gallery({
        name,
        description,
      });

      await newGallery.save();
      return res.status(200).json({ message: "Галерея успешно создана!", gallery: newGallery });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // ПОЛУЧЕНИЕ ВСЕХ ГАЛЕРЕЙ
  static async getAllGalleries(req, res) {
    try {
      const galleries = await Gallery.find().populate("photos");
      return res.status(200).json(galleries);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // ПОЛУЧЕНИЕ ГАЛЕРЕИ ПО ID
  static async getGalleryById(req, res) {
    try {
      const { id } = req.params;
      const gallery = await Gallery.findById(id).populate("photos");
      if (!gallery) {
        return res.status(404).json({ message: "Галерея не найдена!" });
      }
      return res.status(200).json(gallery);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // ОБНОВЛЕНИЕ ГАЛЕРЕИ
  static async updateGallery(req, res) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;

      const gallery = await Gallery.findByIdAndUpdate(
        id,
        { name, description },
        { new: true }
      );

      if (!gallery) {
        return res.status(404).json({ message: "Галерея не найдена!" });
      }

      return res.status(200).json({ message: "Галерея успешно обновлена!", gallery });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // УДАЛЕНИЕ ГАЛЕРЕИ
  static async deleteGallery(req, res) {
    try {
      const { id } = req.params;
      const gallery = await Gallery.findByIdAndDelete(id);
      if (!gallery) {
        return res.status(404).json({ message: "Галерея не найдена!" });
      }
      return res.status(200).json({ message: "Галерея успешно удалена!" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default GalleryController;