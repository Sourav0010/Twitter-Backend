import { Router } from 'express';
import { signup } from '../controller/user.controller.js';

const router = Router();

router.post('/', signup);

export default router;
