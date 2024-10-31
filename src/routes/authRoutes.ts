import { Router } from 'express';
import { register, login, listar } from '../controllers/authController';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/listar', listar);

export default router;
