import { Router } from 'express';
import { postOne } from '../controllers/controllers';

const router = Router();

router.get('/absence', postOne);

export default router;
