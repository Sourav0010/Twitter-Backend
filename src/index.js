import app from './app.js';
import dotenv from 'dotenv';
import { connectToDB } from './db/index.db.js';
dotenv.config({
  path: './.env',
});

connectToDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log('Error connecting to the database: ', err.message);
  });
