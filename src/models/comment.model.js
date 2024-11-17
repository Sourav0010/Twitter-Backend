import { Schema, model } from 'mongoose';

const commentSchema = new Schema(
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
    tweet: {
      type: Schema.Types.ObjectId,
      ref: 'Tweet',
      required: true,
    },
  },
  { timestamps: true },
);

export const Comment = model('Comment', commentSchema);
