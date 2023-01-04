import { Router } from 'express';
import { login } from '../controllers/ConnectController.js';
import {
	addHoliday,
	deleteHoliday,
	getAllHoliday,
	updateHoliday,
} from '../controllers/HolidayController.js';
import { executeScript } from '../controllers/ScriptController.js';
import {
	getAllUser,
	getUser,
	addUser,
	updateUser,
	deleteUser,
	getAllEmployee,
} from '../controllers/UserController.js';
const router = Router();
// Routes User
router.get('/users', getAllUser);
router.get('/employees/manager/:idManager', getAllEmployee);
router.get('/user/:id?', getUser);
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
// Route executer script(traitement de nuit)
router.get('/script', executeScript);
export default router;
