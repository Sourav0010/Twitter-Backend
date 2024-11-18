import { Schema, model } from 'mongoose';

const likeSchema = new Schema(
  {
    tweet: {
      type: Schema.Types.ObjectId,
      ref: 'Tweet',
      default: null,
    },
    comment: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
      default: null,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

export const Like = model('Like', likeSchema);
