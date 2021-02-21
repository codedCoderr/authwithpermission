const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jsonResponse = require('../helper/responseHandler');
const { User } = require('../models/User');
const SECRET_KEY = process.env.SECRET_KEY;

const Register = async (req, res) => {
  const { username, email, password,permissions } = req.body;
  try {
    let user = await User.findOne({
      email,
    });
    if (user) {
      return jsonResponse.error(
        res,
        'error',
        400,
        'A user with the email already exists, please sign in'
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    var newUser = new User({ username, email, password: hash,permissions });

    await newUser.save();
    const token = jwt.sign(
      {
        userId: newUser._id,
      },
      SECRET_KEY,
      { expiresIn: '24h' }
    );
    const data = {
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        permissions:newUser.permissions
      },
      token: token,
    };
    return jsonResponse.success(res, 'success', 201, data);
  } catch (error) {
    return jsonResponse.error(res, 'error', 400, error);
  }
};

module.exports = Register;
