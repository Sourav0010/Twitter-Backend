import { Router } from 'express';
import verifyJWT from '../middlewire/verifyJWT.middlewire.js';
import { createComment, updateComment, deleteComment } from '../controller/comment.controller.js';

const router = Router();

router.use(verifyJWT);

router.route('/:tweetId').post(createComment);
router.route('/:commentId').put(updateComment);
router.route('/:commentId').delete(deleteComment);

export default router;
