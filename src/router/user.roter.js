import { Router } from 'express';
import {
  signup,
  login,
  logout,
  getCurrentuser,
  updateProfile,
} from '../controller/user.controller.js';
import upload from '../middlewire/multer.middlewire.js';
import verifyJWT from '../middlewire/verifyJWT.middlewire.js';

const router = Router();

router.route('/signup').post(
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 },
  ]),
  signup,
);

router.route('/login').post(login);
router.route('/logout').post(verifyJWT, logout);
router.route('/current').get(verifyJWT, getCurrentuser);
router.route('/update').put(verifyJWT,upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'coverImage', maxCount: 1 },
]), updateProfile);

export default router;
