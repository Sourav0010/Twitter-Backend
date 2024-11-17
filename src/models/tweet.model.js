import { Schema, model } from 'mongoose';

const tweetSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    images: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true },
);

export const Tweet = model('Tweet', tweetSchema);
