import { Schema, model } from 'mongoose';

const likeSchema = new Schema(
  {
    tweet: {
      type: Schema.Types.ObjectId,
      ref: 'Tweet',
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

const Like = model('Like', likeSchema);
