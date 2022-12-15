import { Router } from 'express';
import {
	getAllUser,
	getUser,
	addUser,
	updateUser,
	deleteUser,
	getAllEmployee,
	login,
} from '../controllers/controllers';

const router = Router();

// Routes User
router.get('/user', getAllUser);
router.get('/employees/manager/:idManager', getAllEmployee);
router.get('/user/:id', getUser);
router.post('/user/', addUser);
router.put('/user/', updateUser);
router.delete('/user/:id', deleteUser);

// Routes connexion
router.post('/login', login);

export default router;
