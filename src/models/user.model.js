import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      min: [6, 'Password must be at least 6 characters'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      default: '',
    },
    dob: {
      type: Date,
      default: null,
    },
    about: {
      type: String,
      default: '',
    },
    socialLinks: {
      type: [],
      default: [],
    },
  },
  { timestamps: true },
);

export const User = mongoose.model('User', userSchema);
