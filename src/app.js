import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRouter from './router/user.roter.js';
import twitterRouter from './router/tweet.router.js';
import likeRouter from './router/like.router.js';
import commentRouter from './router/comment.router.js';

const app = express();

app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tweets', twitterRouter);
app.use('/api/v1/likes', likeRouter);
app.use('/api/v1/comments', commentRouter);

export default app;
