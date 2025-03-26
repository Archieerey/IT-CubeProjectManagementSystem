import express from 'express';
import PhotoController from '../controller/photoController.js';
import upload from '../config/multerConfig.js';


const photoRoutes = express.Router();

photoRoutes.get('/photo', PhotoController.getAllPhotos);
photoRoutes.get('/photo/:id', PhotoController.getPhotoById);
photoRoutes.post('/photo/upload', upload.single('image'), PhotoController.uploadPhoto);
photoRoutes.patch('/photo/change/:id', PhotoController.updatePhoto);
photoRoutes.delete('/photo/delete/:id', PhotoController.deletePhoto);

export default photoRoutes;