import { Router } from 'express';
import verifyJWT from '../middlewire/verifyJWT.middlewire.js';
import { likeTweet,likeComment } from '../controller/like.controller.js';

const router = Router();

router.use(verifyJWT);

router.route('/:tweetId').post(likeTweet);
router.route('/:commentId').post(likeComment);

export default router;
