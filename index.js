const express = require('express');
const bodyParser = require('body-parser');

require('./database/db');
require('dotenv').config();
const router = require('./routes');

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use('/api/v1', router);
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
module.exports = app;
