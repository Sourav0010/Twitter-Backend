import mongoose from 'mongoose';
import app from '../app.js';

export const connectToDB = async () => {
  try {
    const response = await mongoose.connect(
      `${process.env.MONGODB_URI}/twitter`,
    );
    app.on('error', (error) => {
      console.log('Error connecting to the database: ', error);
      throw new Error('Error connecting to the database');
    });
    console.log(`MongoDB connected: ${response.connection.host}`);
  } catch (error) {
    console.log('Error connecting to the database: ', error);
    process.exit(1);
  }
};
