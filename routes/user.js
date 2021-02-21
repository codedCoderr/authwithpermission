const express = require('express');
const user = require('../controller/User');
const verify = require('../middleware/verify');

const router = express.Router();

router.put('/:userId', verify, user.updateUser);

module.exports = router;
