require('dotenv').config();

const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/yaya-api';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.info(`Successfully connected to ${MONGO_URI}`); 
    console.log(process.env.MONGODB_URI)
  })
  .catch(error => console.error('An error ocurred trying to connect to database', error));