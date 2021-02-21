const express = require('express');
const router = express.Router();
const user = require('./user');
const movie = require('./movie');
const auth = require('./auth');

router.get('/', (req, res) => {
  res.json({ message: 'Server Connected' });
});
router.use('/users', user);
router.use('/auth', auth);
router.use('/movie', movie);

module.exports = router;
