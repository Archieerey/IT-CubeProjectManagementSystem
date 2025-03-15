import express from 'express';
import GalleryController from '../controller/galleryContoller.js';

const galleryRoutes = express.Router();

galleryRoutes.get('/gallery', GalleryController.getAllGalleries);
galleryRoutes.get('/gallery/:id', GalleryController.getGalleryById);
galleryRoutes.post('/gallery/create', GalleryController.createGallery);
galleryRoutes.patch('/gallery/change/:id', GalleryController.updateGallery);
galleryRoutes.delete('/gallery/delete/:id', GalleryController.deleteGallery);

export default galleryRoutes;