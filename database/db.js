let mongoose = require('mongoose');
require('dotenv').config();
const { DB_URL } = process.env;

module.exports = mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => {
    throw error;
  });
