import { Router } from 'express';
import verifyJWT from '../middlewire/verifyJWT.middlewire.js';
import {
  createTweet,
  getTweet,
  updateTweet,
  deleteTweet,
  getTweets,
} from '../controller/tweet.controller.js';
import upload from '../middlewire/multer.middlewire.js';

const router = Router();

router.use(verifyJWT);

router.route('/').post(upload.single('image'), createTweet).get(getTweets);
router
  .route('/:tweetId')
  .get(getTweet)
  .patch(upload.single('image'), updateTweet)
  .delete(deleteTweet);

export default router;
