import express from 'express';
import ProjectController from '../controller/projectContoller.js'

const projectRoutes = express.Router();

projectRoutes.get('/project', ProjectController.getAllProjects);
projectRoutes.get('/project/:id', ProjectController.getProjectById);
projectRoutes.post('/project/create', ProjectController.createProject);
projectRoutes.patch('/project/change/:id', ProjectController.updateProject);
projectRoutes.delete('/project/delete/:id', ProjectController.deleteProject);

export default projectRoutes;