import { asyncHandler } from '../utils/AsyncHandler.util.js';
import ApiError from '../utils/ApiError.util.js';

const signup = asyncHandler(async (req, res) => {
  return res.status(400).json(new ApiError(400, 'Invalid email or password'));
});

export { signup };
