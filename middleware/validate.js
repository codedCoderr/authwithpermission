const jsonResponse = require('../helper/responseHandler');

const validate = async (req, res, next) => {
  const { email, password, username } = req.body;

  if (!/[\w]+@[a-zA-Z]+\.[a-zA-Z]{2}/.test(email)) {
    return jsonResponse.error(res, 'error', 400, 'Incorrect email format');
  }

  if (!password || password.length < 3) {
    return jsonResponse.error(
      res,
      'error',
      400,
      'Password should be more than 3 characters '
    );
  }

  if (!username) {
    return jsonResponse.error(res, 'error', 400, 'Username is required');
  }
  next();
};

module.exports = validate;
