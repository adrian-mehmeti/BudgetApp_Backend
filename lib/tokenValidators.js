const { respond } = require('./responder');
const User = require('../models/model.users');
const jwt = require('jsonwebtoken');

module.exports = {
  validateUserToken: async (req, res, next) => {
    if (!req.headers.authorization) {
      return respond(res, 'Token not provided', false);
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SERCRET);
      req.decoded = decoded._id;

      const user = await User.findOne({ _id: decoded._id }).exec();
      req.role = user.role;

      next();
    } catch (err) {
      return respond(res, 'Invalid token', false);
    }
  },
  isAdmin: (req, res, next) => {
    if (req.role !== 'ADMIN') {
      return respond(res, 'You dont have access', false);
    }
    next();
  },
};
