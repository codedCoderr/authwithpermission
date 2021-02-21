const { User } = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jsonResponse = require('../helper/responseHandler');
const SECRET_KEY = process.env.SECRET_KEY;

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === '' || password === '') {
      return jsonResponse.error(
        res,
        'error',
        400,
        'Input field cannot be blank'
      );
    }

    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      return jsonResponse.error(res, 'error', 401, 'Invalid Credentials');
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return jsonResponse.error(res, 'error', 401, 'Invalid Credentials');
    }
    const token = jwt.sign(
      {
        userId: user._id,
      },
      SECRET_KEY,
      {
        expiresIn: '24h',
      }
    );

    const data = {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    };
    return jsonResponse.success(res, 'success', 200, data);
  } catch (error) {
    return jsonResponse.error(res, 'error', 400, error);
  }
};

module.exports = Login;
