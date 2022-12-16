import { Router } from 'express';
import { login } from '../controllers/ConnectController';
import {
	addHoliday,
	deleteHoliday,
	getAllHoliday,
	updateHoliday,
} from '../controllers/HolidayController';
import {
	getAllUser,
	getUser,
	addUser,
	updateUser,
	deleteUser,
	getAllEmployee,
} from '../controllers/UserController';

const router = Router();

// Routes User
router.get('/user', getAllUser);
router.get('/employees/manager/:idManager', getAllEmployee);
router.get('/user/:id', getUser);
router.post('/user', addUser);
router.put('/user', updateUser);
router.delete('/user/:id', deleteUser);

// Routes Connexion
router.post('/login', login);

// Routes Holiday
router.get('/holiday', getAllHoliday);
router.post('/holiday', addHoliday);
router.put('/holiday', updateHoliday);
router.delete('/holiday/:id', deleteHoliday);

export default router;
