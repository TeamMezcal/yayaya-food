require('dotenv').config();

const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/yaya-api';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.info(`Successfully connected to ${MONGODB_URI}`); 
    console.log(process.env.MONGODB_URI)
  })
  .catch(error => console.error('An error ocurred trying to connect to database', error));