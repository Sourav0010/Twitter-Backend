import { asyncHandler } from '../utils/AsyncHandler.util.js';
import ApiError from '../utils/ApiError.util.js';
import { User } from '../models/user.model.js';
import uploadToCloudinary from '../utils/UploadToCloudinary.util.js';
import ApiResponse from '../utils/ApiResponse.util.js';
import { deleteFromCloudinary } from '../utils/DeleteFromCloudinary.util.js';

const generateAccessTokenAndRefreshToken = async (userid) => {
  try {
    const user = await User.findById(userid);

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, 'Internal server error');
  }
};

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

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, 'Email and password are required');
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  const isPasswordMatch = await user.isPasswordCorrect(password);

  if (!isPasswordMatch) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(user._id);

  const newUser = await User.findById(user._id).select(
    '-password -refreshToken',
  );

  return res
    .status(200)
    .cookie('refreshToken', refreshToken, { httpOnly: true, self: true })
    .cookie('accessToken', accessToken, { httpOnly: true, self: true })
    .json(
      new ApiResponse(200, { user: newUser }, 'User logged in successfully'),
    );
});

const logout = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new ApiError(401, 'Unauthorized');
  }

  const loginedUser = await User.findById(user._id);
  loginedUser.refreshToken = '';
  await loginedUser.save({ validateBeforeSave: false });

  return res
    .status(200)
    .clearCookie('refreshToken')
    .clearCookie('accessToken')
    .json(new ApiResponse(200, {}, 'User logged out successfully'));
});

const getCurrentuser = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(401, 'Unauthorized');
  }
  const currentUser = await User.findById(user._id).select(
    '-password -refreshToken',
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, { user: currentUser }, 'User fetched successfully'),
    );
});

const updateProfile = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new ApiError(401, 'Unauthorized');
  }

  const currentUser = await User.findById(user._id);

  const { fullName, bio, username, dob, about, socialLinks } = req.body;

  if (username) {
    const isUsernameExist = await User.findOne({ username });
    if (isUsernameExist) {
      throw new ApiError(400, 'Username already exists');
    }
    currentUser.username = username;
  }

  if (bio && bio.trim() !== '') {
    currentUser.bio = bio;
  }

  if (fullName && fullName.trim() !== '') {
    currentUser.fullName = fullName;
  }

  let avatarLocalPath = '';
  if (req?.files && Array.isArray(req?.files?.avatar)) {
    avatarLocalPath = req?.files?.avatar[0]?.path;
    const currentAvatar = currentUser.avatar;
    if (currentAvatar) {
      const publicId = currentAvatar.split('/').pop().split('.')[0];
      const response = await deleteFromCloudinary(publicId);
      response ? console.log('Avatar deleted successfully') : console.log('Avatar not deleted');
    }
    const avatar = await uploadToCloudinary(avatarLocalPath);
    currentUser.avatar = avatar.url;
  }

  let coverImageLocalPath = '';
  if (req?.files && Array.isArray(req?.files?.coverImage)) {
    coverImageLocalPath = req?.files?.coverImage[0]?.path;
    const currentCoverImage = currentUser.coverImage;
    if (currentCoverImage) {
      const publicId = currentCoverImage.split('/').pop().split('.')[0];
      const response = await deleteFromCloudinary(publicId);
      response && console.log('Cover image deleted successfully');
      console.log('Cover image not deleted');
    }
    const coverImage = await uploadToCloudinary(coverImageLocalPath);
    currentUser.coverImage = coverImage.url;
  }

  if (dob) {
    currentUser.dob = dob;
  }

  if (about) {
    currentUser.about = about;
  }

  if (socialLinks) {
    currentUser.socialLinks = socialLinks;
  }

  await currentUser.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(
      new ApiResponse(200, { user: currentUser }, 'User updated successfully'),
    );
});

export { signup, login, logout, getCurrentuser, updateProfile };
