const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT;

require('./database/db');
require('dotenv').config();
const router = require('./routes');

const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Server Connected' });
});
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use('/api/v1', router);
const port = PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
module.exports = app;
