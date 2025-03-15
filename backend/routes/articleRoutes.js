import express from 'express';
import ArticleController from '../controller/articleController.js';

const articleRoutes = express.Router();

articleRoutes.get('/article', ArticleController.getAllArticles);
articleRoutes.get('/article/:id', ArticleController.getArticleById);
articleRoutes.post('/article/create', ArticleController.createArticle);
articleRoutes.patch('/article/change/:id', ArticleController.updateArticle);
articleRoutes.delete('/article/delete/:id', ArticleController.deleteArticle);

export default articleRoutes;