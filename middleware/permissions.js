const jsonResponse = require('../helper/responseHandler');
const { User } = require('../models/User');

const permissions = {
  async checkPermission(permission, req, res, next) {
    try {
      let user = await User.findById(req.user._id);
      if (user) {

        if (user.permissions.includes(permission)) {
          return next();
        }
        return jsonResponse.error(
          res,
          'error',
          401,
          'You are not permitted to do that'
        );
      }
      return jsonResponse.error(
        res,
        'error',
        401,
        'Unauthorized, please sign in to continue'
      );
    } catch (error) {
      return jsonResponse.error(res, 'error', 400, error);
    }
  },
};
module.exports = permissions;
