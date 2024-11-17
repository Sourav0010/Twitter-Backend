import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRouter from './router/user.roter.js';

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

export default app;
