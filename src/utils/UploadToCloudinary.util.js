import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

const uploadToCloudinary = async (fileLocalPath) => {
  try {
    if (!fileLocalPath) {
      return null;
    }
    const data = await cloudinary.uploader.upload(fileLocalPath);
    if (data) {
      fs.unlinkSync(fileLocalPath);
    } else {
      throw new Error('Error uploading image to cloudinary');
    }
    return data;
  } catch (error) {
    fs.unlinkSync(fileLocalPath);
    throw new Error(error.message || 'Error uploading image to cloudinary');
  }
};

export default uploadToCloudinary;
