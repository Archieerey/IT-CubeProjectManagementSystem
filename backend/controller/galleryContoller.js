import Gallery from "../models/Gallery.js";
import Photo from "../models/Photo.js";

class GalleryController {
  static async createGallery(req, res) {
    try {
      console.log('Request body:', req.body);
      console.log('Uploaded files:', req.files);
      
      const { name, description } = req.body;
      
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "Необходимо загрузить хотя бы одно фото" });
      }
  
      const newGallery = new Gallery({ name, description, photos: [] });
      await newGallery.save();
  
      const photos = await Promise.all(
        req.files.map(async (file) => {
          const newPhoto = new Photo({
            url: `/uploads/${file.filename}`,
            name: file.originalname,
            gallery: newGallery._id
          });
          await newPhoto.save();
          return newPhoto._id;
        })
      );
  
      newGallery.photos = photos;
      await newGallery.save();
  
      console.log('Created gallery:', newGallery);
      res.status(201).json(newGallery);
      
    } catch (error) {
      console.error('Error creating gallery:', error);
      res.status(500).json({ 
        message: 'Ошибка при создании галереи',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
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
      const gallery = await Gallery.findById(req.params.id).populate('photos');
      if (!gallery) {
        return res.status(404).json({ message: 'Галерея не найдена' });
      }
      res.json(gallery);
    } catch (error) {
      res.status(500).json({ message: error.message });
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