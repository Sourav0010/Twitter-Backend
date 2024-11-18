import { Comment } from '../models/comment.model.js';
import { asyncHandler } from '../utils/AsyncHandler.util.js';
import ApiError from '../utils/ApiError.util.js';
import ApiResponse from '../utils/ApiResponse.util.js';
import { Tweet } from '../models/tweet.model.js';

const createComment = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const { user } = req;
  const { tweetId } = req.params;

  if (!content) {
    throw new ApiError(400, 'Comment cannot be empty');
  }

  if (!tweetId) {
    throw new ApiError(400, 'Tweet ID is required');
  }

  if (!user) {
    throw new ApiError(401, 'Unauthorized');
  }

  const isExist = await Tweet.findById(tweetId);
  if (!isExist) {
    throw new ApiError(404, 'Tweet not found');
  }

  const comment = await Comment.create({
    content: content,
    user: user._id,
    tweet: tweetId,
  });

  if (!comment) {
    throw new ApiError(500, 'Comment not created');
  }

  return res
    .status(201)
    .json(new ApiResponse(201, comment, 'Comment created', comment));
});

const updateComment = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const { user } = req;
  const { commentId } = req.params;

  if (!content) {
    throw new ApiError(400, 'Comment cannot be empty');
  }

  if (!commentId) {
    throw new ApiError(400, 'Comment ID is required');
  }

  if (!user) {
    throw new ApiError(401, 'Unauthorized');
  }

  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new ApiError(404, 'Comment not found');
  }

  if (comment.user.toString() !== user._id.toString()) {
    throw new ApiError(403, 'Unauthorized');
  }

  comment.content = content;
  await comment.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, comment, 'Comment updated', comment));
});

const deleteComment = asyncHandler(async (req, res) => {
  const { user } = req;
  const { commentId } = req.params;

  if (!commentId) {
    throw new ApiError(400, 'Comment ID is required');
  }

  if (!user) {
    throw new ApiError(401, 'Unauthorized');
  }

  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new ApiError(404, 'Comment not found');
  }

  if (comment.user.toString() !== user._id.toString()) {
    throw new ApiError(403, 'Unauthorized');
  }

  await Comment.findByIdAndDelete(commentId);

  return res
    .status(200)
    .json(new ApiResponse(200, null, 'Comment deleted', null));
});

export { createComment, updateComment, deleteComment };
