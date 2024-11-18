import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError.util.js';
import { User } from '../models/user.model.js';

const verifyJWT = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;
    if (!token) {
      throw new ApiError(401, 'Unauthorized');
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decodedToken) {
      throw new ApiError(401, 'Unauthorized');
    }

    const user = await User.findById(decodedToken._id);
    req.user = user;

    next();
  } catch (error) {
    throw new ApiError(401, 'Unauthorized');
  }
};

export default verifyJWT;
