require('dotenv').config();

const mongoose = require('mongoose');
const { logger } = require('../utils/logger');

exports.dbConnect = () => {
  const uri = process.env.MONGODB_URI;

  mongoose.connect(uri, {
  }).then(() => {
    logger('Database connected successfully');
  }).catch((error) => {
    logger('Database connection error:', error);
  });
};
