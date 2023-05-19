import express from 'express';

import mongoose, { Mongoose } from 'mongoose';

import dotenv from 'dotenv';

// dotenv.config()

mongoose.set('strictQuery', false);

// App config
const app = express();

//Middleware

// DB config
// const PORT = process.env.PORT || 6001;

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const PORT = process.env.PORT || 8001;

const CONNECTION = process.env.MONGO_URL;

const mongoConnect = async () => {
  try {
    await mongoose.connect(CONNECTION);
    app.listen(PORT, () => console.log('App listening on port: ' + PORT));
  } catch (error) {
    console.log(error.message);
  }
};

mongoConnect();

//API Endpoints
app.get('/', (req, res) => res.status(200).send('It is Working'));

// Listener
