const express = require('express');
const user = require('../controller/User');
const verify = require('../middleware/verify');
const { checkPermission } = require('../middleware/permissions');
const { permissions } = require('../constants/permissions');
const router = express.Router();

router.post(
  '/add',
  verify,
  (req, res, next) =>
    checkPermission(permissions.CAN_CREATE_MOVIE, req, res, next),
  user.createMovie
);
router.put(
  '/update/:movieId',
  verify,
  (req, res, next) =>
    checkPermission(permissions.CAN_UPDATE_MOVIE, req, res, next),
  user.updateMovie
);
router.delete(
  '/delete/:movieId',
  verify,
  (req, res, next) =>
    checkPermission(permissions.CAN_DELETE_MOVIE, req, res, next),
  user.deleteMovie
);

module.exports = router;
