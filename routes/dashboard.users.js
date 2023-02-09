const express = require('express');
const router = express.Router();
const dashboardUsers = require('../controllers/controller.dashboard.users');
const { respond } = require('../lib/responder');
const fieldValidators = require('../lib/fieldValidators');
const { validateUserToken, isAdmin } = require('../lib/tokenValidators');

router.get('/', validateUserToken, isAdmin, async (req, res) => {
  try {
    const result = await dashboardUsers.getAllUsers();
    return respond(res, result);
  } catch (err) {
    return respond(res, err.message, false);
  }
});

router.get('/:id', validateUserToken, isAdmin, async (req, res) => {
  try {
    const result = await dashboardUsers.getSingleUser(req.params.id);
    return respond(res, result);
  } catch (err) {
    return respond(res, err.message, false);
  }
});

router.post(
  '/',
  validateUserToken,
  isAdmin,
  fieldValidators.validate.user,
  fieldValidators.validateResult,
  async (req, res) => {
    try {
      const result = await dashboardUsers.createUser(req.body);
      return respond(res, result);
    } catch (err) {
      return respond(res, err.message, false);
    }
  }
);

router.patch('/:id', validateUserToken, isAdmin, async (req, res) => {
  try {
    const result = await dashboardUsers.updateUser(req.params.id, req.body);
    respond(res, result);
  } catch (err) {
    return respond(res, err.message, false);
  }
});

router.delete('/:id', validateUserToken, isAdmin, async (req, res) => {
  try {
    const result = await dashboardUsers.deleteUser(req.params.id);
    respond(res, result);
  } catch (err) {
    return respond(res, err.message, false);
  }
});

module.exports = router;
