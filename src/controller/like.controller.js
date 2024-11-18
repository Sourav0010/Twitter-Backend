import ApiError from '../utils/ApiError.util.js';
import ApiResponse from '../utils/ApiResponse.util.js';
import { asyncHandler } from '../utils/AsyncHandler.util.js';
import { Like } from '../models/like.model.js';
import { Tweet } from '../models/tweet.model.js';
import { Comment } from '../models/comment.model.js';

const likeTweet = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  const user = req.user;

  if (!tweetId) {
    throw new ApiError(400, 'Tweet ID is required');
  }

  const tweet = await Tweet.findById(tweetId);
  if (!tweet) {
    throw new ApiError(404, 'Tweet not found');
  }

  const isLiked = await Like.findOne({ tweet: tweetId, user: user._id });

  if (isLiked) {
    await Like.findByIdAndDelete(isLiked._id);
    return res.status(200).json(new ApiResponse(200, {}, 'Tweet unliked'));
  } else {
    const newLike = await Like.create({ tweet: tweetId, user: user._id });
    return res.status(201).json(new ApiResponse(201, newLike, 'Tweet liked'));
  }
});

const likeComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const user = req.user;

  if (!commentId) {
    throw new ApiError(400, 'Comment ID is required');
  }

  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new ApiError(404, 'Comment not found');
  }

  const isLiked = await Like.findOne({ comment: commentId, user: user._id });

  if (isLiked) {
    await Like.findByIdAndDelete(isLiked._id);
    return res.status(200).json(new ApiResponse(200, {}, 'Comment unliked'));
  } else {
    const newLike = await Like.create({ comment: commentId, user: user._id });
    return res.status(201).json(new ApiResponse(201, newLike, 'Comment liked'));
  }
});

export { likeTweet, likeComment };
