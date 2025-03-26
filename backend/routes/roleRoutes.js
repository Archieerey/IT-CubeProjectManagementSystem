import express from 'express';
import RoleController from '../controller/roleController.js';

const roleRoutes = express.Router();

roleRoutes.get('/role', RoleController.getRoles);
roleRoutes.post('/role/create', RoleController.createRole);
roleRoutes.post('/role/set', RoleController.setRole);
roleRoutes.patch('/role/change/:id', RoleController.changeRoleName);

export default roleRoutes;