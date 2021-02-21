const express = require('express');
const bodyParser = require('body-parser');

require('./database/db');
require('dotenv').config();
const router = require('./routes');

const app = express();
app.get('/', (req, res) => {
  res.send('hello');
});
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use('/api/v1', router);

app.listen(8000);
module.exports = app;
