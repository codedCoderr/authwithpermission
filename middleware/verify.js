const jwt = require('jsonwebtoken');
const jsonResponse = require('../helper/responseHandler');
const SECRET_KEY = process.env.SECRET_KEY;
const { User } = require('../models/User');
const verify = async (req, res, next) => {
  try {
    const header = req.headers['authorization'];

    const bearer = header.split(' ');
    const token = bearer[1];

    let decoded = await jwt.verify(token, SECRET_KEY);

    let user = await User.findById(decoded.userId);
    if(user){
       req.user = user;

    return next();
    }
    return jsonResponse.error(
      res,
      'error',
      401,
      'Unauthorized, please sign in to continue'
    );
   
  } catch (error) {
    return jsonResponse.error(res, 'error', 401, error);
  }
};

module.exports = verify;
