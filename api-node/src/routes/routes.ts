import { Router } from 'express';
import { postOne } from '../controllers/controllers';

const router = Router();

router.get('/user', postOne);

export default router;
