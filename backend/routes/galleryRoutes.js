import express from 'express';
import GalleryController from '../controller/galleryContoller.js';
import upload from '../config/multerConfig.js';

const galleryRoutes = express.Router();

galleryRoutes.get('/gallery', GalleryController.getAllGalleries);
galleryRoutes.get('/gallery/:id', GalleryController.getGalleryById);
galleryRoutes.post('/create', upload.array('photos'), GalleryController.createGallery);
galleryRoutes.patch('/gallery/change/:id', GalleryController.updateGallery);
galleryRoutes.delete('/gallery/delete/:id', GalleryController.deleteGallery);

export default galleryRoutes;

// import express from 'express';
// import GalleryController from '../controller/galleryContoller.js';
// import upload from '../config/multerConfig.js';

// const router = express.Router();

// router.post('/create', upload.array('photos'), GalleryController.createGallery);
// router.get('/', GalleryController.getAllGalleries);
// router.get('/:id', GalleryController.getGalleryById);
// router.patch('/:id', GalleryController.updateGallery);
// router.delete('/:id', GalleryController.deleteGallery);

// export default galleryRoutes;