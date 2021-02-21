const express = require('express');
const login = require('../controller/Login');
const register = require('../controller/Register');
const validate = require('../middleware/validate');
const router = express.Router();

router.post('/login', login);
router.post('/register', validate, register);

module.exports = router;
