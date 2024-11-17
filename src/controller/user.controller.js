import { asyncHandler } from '../utils/AsyncHandler.util.js';
import ApiError from '../utils/ApiError.util.js';
import { User } from '../models/user.model.js';
import uploadToCloudinary from '../utils/UploadToCloudinary.util.js';
import ApiResponse from '../utils/ApiResponse.util.js';

const signup = asyncHandler(async (req, res) => {
  const { username, email, password, fullName } = req.body;
  if (
    [username, email, password, fullName].some(
      (field) => !field || field.trim() === '',
    )
  ) {
    throw new ApiError(400, 'Missing required fields');
  }

  const isUserExist = await User.findOne({ $or: [{ username }, { email }] });

  if (isUserExist) {
    throw new ApiError(400, 'User already exists');
  }

  if (!req?.files || !req?.files?.avatar) {
    throw new ApiError(400, 'Avatar is required');
  }

  const avatarLocalPath = req?.files?.avatar[0]?.path;

  let coverImageLocalPath = '';

  if (req?.files && Array.isArray(req?.files?.coverImage)) {
    coverImageLocalPath = req?.files?.coverImage[0]?.path;
  }

  const avatar = await uploadToCloudinary(avatarLocalPath);
  let coverImage = '';
  if (coverImageLocalPath) {
    coverImage = await uploadToCloudinary(coverImageLocalPath);
  }

  const user = await User.create({
    username,
    email,
    password,
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || '',
  });

  if (!user) {
    throw new ApiError(400, 'User not created');
  }

  return res
    .status(201)
    .json(new ApiResponse(201, user, 'User created successfully'));
});

export { signup };
