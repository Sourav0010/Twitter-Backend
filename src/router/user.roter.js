import { Router } from 'express';
import { signup } from '../controller/user.controller.js';
import upload from '../middlewire/multer.middlewire.js';
const router = Router();

router.route('/signup').post(
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 },
  ]),
  signup,
);

export default router;
