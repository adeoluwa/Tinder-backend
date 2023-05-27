import express from 'express';

import mongoose, { Mongoose } from 'mongoose';

import Cors from 'cors';

import dotenv from 'dotenv';

import Cards from './dbCards.js';

// dotenv.config()

mongoose.set('strictQuery', false);

// App config
const app = express();

//Middleware
app.use(express.json());
app.use(Cors());

// DB config
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
//

//API Endpoints

app.get('/', (req, res) => res.status(200).send('It is Working'));



app.post('/tinder/cards', (req, res) => {
  const dbCard = req.body;
  Cards.create().then((error, data) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(201).send(data);
    }
  });
});



app.get('/tinder/cards', (req, res) => {
  Cards.find().then((error, data) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(data);
    }
  });
});

