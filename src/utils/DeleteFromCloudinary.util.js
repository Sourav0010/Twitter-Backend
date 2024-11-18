import { v2 as cloudinary } from 'cloudinary';

export const deleteFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
