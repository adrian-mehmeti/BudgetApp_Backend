const express = require('express');
const router = express.Router();
const controllerSavings = require('../controllers/controller.savings');
const { respond } = require('../lib/responder');
const { validateUserToken } = require('../lib/tokenValidators');
const fieldValidators = require('../lib/fieldValidators');

router.get('/', validateUserToken, async (req, res) => {
  try {
    const result = await controllerSavings.getSavings(req.decoded);
    return respond(res, result);
  } catch (err) {
    return respond(res, err.message, false);
  }
});

router.get('/:id', validateUserToken, async (req, res) => {
  try {
    const result = await controllerSavings.getSingleSavings(
      req.params.id,
      req.decoded
    );
    return respond(res, result);
  } catch (err) {
    return respond(res, err.message, false);
  }
});

router.post(
  '/',
  validateUserToken,
  fieldValidators.validate.savings,
  fieldValidators.validateResult,
  async (req, res) => {
    try {
      const result = await controllerSavings.createSavings(
        req.body,
        req.decoded
      );
      return respond(res, result);
    } catch (err) {
      return respond(res, err.message, false);
    }
  }
);

router.patch('/:id', validateUserToken, async (req, res) => {
  try {
    const result = await controllerSavings.updateSavings(
      req.params.id,
      req.body,
      req.decoded
    );
    return respond(res, result);
  } catch (err) {
    return respond(res, err.message, false);
  }
});

router.delete('/:id', validateUserToken, async (req, res) => {
  try {
    const result = await controllerSavings.deleteSavings(
      req.params.id,
      req.decoded
    );
    return respond(res, result);
  } catch (err) {
    return respond(res, err.message, false);
  }
});

module.exports = router;
