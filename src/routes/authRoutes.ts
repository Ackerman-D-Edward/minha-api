import { Router } from 'express';
import { register, login } from '../controllers/authController';

const router = Router();

router.post('/register');
router.post('/login');

export default router;
