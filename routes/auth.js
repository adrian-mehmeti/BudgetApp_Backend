const express = require('express');
const router = express.Router();
const authUserController = require('../controllers/controller.auth.users');
const fieldValidators = require('../lib/fieldValidators');
const { respond } = require('../lib/responder');

router.post(
  '/register',
  fieldValidators.validate.register,
  fieldValidators.validateResult,
  async (req, res) => {
    try {
      const user = await authUserController.register(req.body);
      return respond(res, user);
    } catch (err) {
      return respond(res, err.message, false);
    }
  }
);

router.post(
  '/login',
  fieldValidators.validate.logIn,
  fieldValidators.validateResult,
  async (req, res) => {
    try {
      const result = await authUserController.logIn(req.body);
      return respond(res, result);
    } catch (err) {
      return respond(res, err.message, false);
    }
  }
);

router.get('/verify-account', async (req, res) => {
  try {
    const result = await authUserController.verifyAccount(req.query.token);
    return respond(res, result);
  } catch (err) {
    return respond(res, err.message, false);
  }
});

router.post(
  '/send-reset-password',
  fieldValidators.validate.resetPasswordEmail,
  fieldValidators.validateResult,
  async (req, res) => {
    try {
      const result = await authUserController.sendResetPassword(req.body.email);
      return respond(res, result);
    } catch (err) {
      return respond(res, err.message, false);
    }
  }
);

router.post(
  '/reset-pass',
  fieldValidators.validate.resetPassword,
  fieldValidators.validateResult,
  async (req, res) => {
    try {
      const result = await authUserController.resetPass(
        req.body.token,
        req.body.password,
        req.body.confirmPassword
      );
      return respond(res, result);
    } catch (err) {
      return respond(res, err.message, false);
    }
  }
);

module.exports = router;
