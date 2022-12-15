import { Router } from 'express';
import {
	getAllUser,
	getUser,
	addUser,
	updateUser,
	deleteUser,
	getAllEmployee,
} from '../controllers/controllers';

const router = Router();

router.get('/user', getAllUser);
router.get('/employees/manager/:idManager', getAllEmployee);
router.get('/user/:id', getUser);
router.post('/user/', addUser);
router.put('/user/', updateUser);
router.delete('/user/:id', deleteUser);

export default router;
