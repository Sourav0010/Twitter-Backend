import { Tweet } from '../models/tweet.model.js';
import { asyncHandler } from '../utils/AsyncHandler.util.js';
import uploadToCloudinary from '../utils/UploadToCloudinary.util.js';
import ApiResponse from '../utils/ApiResponse.util.js';
import { deleteFromCloudinary } from '../utils/DeleteFromCloudinary.util.js';

const createTweet = asyncHandler(async (req, res) => {
  const { content } = req.body;
  console.log(req.body);

  if (!content) {
    return res.status(400).json({ message: 'Content is required' });
  }

  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  let imageLocalPath = '';

  if (req?.file && req?.file?.path) {
    imageLocalPath = req.file.path;
  }

  const image = await uploadToCloudinary(imageLocalPath);

  const tweet = await Tweet.create({
    content,
    user: user._id,
    images: image?.url || '',
  });

  if (!tweet) {
    return res.status(500).json({ message: 'Error creating tweet' });
  }

  return res
    .status(201)
    .json(new ApiResponse(201, tweet, 'Tweet created successfully'));
});

const getTweet = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;

  if (!tweetId) {
    return res.status(400).json({ message: 'Tweet ID is required' });
  }

  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const tweets = await Tweet.findById(tweetId);

  if (!tweets) {
    return res.status(404).json({ message: 'Tweet not found' });
  }

  return res.status(200).json(new ApiResponse(200, tweets, 'Tweet found'));
});

const updateTweet = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  const { content } = req.body;

  if (!tweetId) {
    return res.status(400).json({ message: 'Tweet ID is required' });
  }

  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const tweet = await Tweet.findById(tweetId);

  if (!tweet) {
    return res.status(404).json({ message: 'Tweet not found' });
  }

  if (tweet.user.toString() !== user._id.toString()) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (content) {
    tweet.content = content;
  }

  if (req.file && req.file.path) {
    const prevImg = tweet.images;
    const image = await uploadToCloudinary(req.file.path);
    const isDeleted = await deleteFromCloudinary(
      prevImg.split('/').pop().split('.')[0],
    );
    isDeleted ? console.log('Image deleted') : console.log('Image not deleted');
    tweet.images = image.url;
  }

  await tweet.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, tweet, 'Tweet updated successfully'));
});

const deleteTweet = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;

  if (!tweetId) {
    return res.status(400).json({ message: 'Tweet ID is required' });
  }

  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const tweet = await Tweet.findById(tweetId);

  if (!tweet) {
    return res.status(404).json({ message: 'Tweet not found' });
  }

  if (tweet.user.toString() !== user._id.toString()) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const prevImg = tweet.images;
  const isDeleted = await deleteFromCloudinary(
    prevImg.split('/').pop().split('.')[0],
  );
  isDeleted ? console.log('Image deleted') : console.log('Image not deleted');

  await Tweet.findByIdAndDelete(tweetId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, 'Tweet deleted successfully'));
});

const getTweets = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const tweets = await Tweet.find({ user: user._id });

  return res.status(200).json(new ApiResponse(200, tweets, 'Tweets found'));
});

export { createTweet, getTweet, updateTweet, deleteTweet, getTweets };
