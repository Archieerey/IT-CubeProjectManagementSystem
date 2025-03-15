import Photo from "../models/Photo.js";

class PhotoController {
  // ЗАГРУЗКА ФОТОГРАФИИ
  static async uploadPhoto(req, res) {
    try {
      const { description, gallery, uploadedBy } = req.body;
      const imageUrl = req.file.path; // Путь к загруженному файлу

      const newPhoto = new Photo({
        imageUrl,
        description,
        gallery,
        uploadedBy,
      });

      await newPhoto.save();
      return res.status(200).json({ message: "Фотография успешно загружена!", photo: newPhoto });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // ПОЛУЧЕНИЕ ВСЕХ ФОТОГРАФИЙ
  static async getAllPhotos(req, res) {
    try {
      const photos = await Photo.find().populate("gallery uploadedBy");
      return res.status(200).json(photos);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // ПОЛУЧЕНИЕ ФОТОГРАФИИ ПО ID
  static async getPhotoById(req, res) {
    try {
      const { id } = req.params;
      const photo = await Photo.findById(id).populate("gallery uploadedBy");
      if (!photo) {
        return res.status(404).json({ message: "Фотография не найдена!" });
      }
      return res.status(200).json(photo);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // ОБНОВЛЕНИЕ ФОТОГРАФИИ
  static async updatePhoto(req, res) {
    try {
      const { id } = req.params;
      const { description } = req.body;

      const photo = await Photo.findByIdAndUpdate(
        id,
        { description },
        { new: true }
      );

      if (!photo) {
        return res.status(404).json({ message: "Фотография не найдена!" });
      }

      return res.status(200).json({ message: "Фотография успешно обновлена!", photo });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // УДАЛЕНИЕ ФОТОГРАФИИ
  static async deletePhoto(req, res) {
    try {
      const { id } = req.params;
      const photo = await Photo.findByIdAndDelete(id);
      if (!photo) {
        return res.status(404).json({ message: "Фотография не найдена!" });
      }
      return res.status(200).json({ message: "Фотография успешно удалена!" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default PhotoController;