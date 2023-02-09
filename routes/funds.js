const express = require('express');
const router = express.Router();
const controllerFunds = require('../controllers/controller.funds');
const { respond } = require('../lib/responder');
const { validateUserToken } = require('../lib/tokenValidators');
const fieldValidators = require('../lib/fieldValidators');

router.get('/', validateUserToken, async (req, res) => {
  try {
    const result = await controllerFunds.getFunds(req.decoded);
    return respond(res, result);
  } catch (err) {
    return respond(res, err.message, false);
  }
});

router.get('/:id', validateUserToken, async (req, res) => {
  try {
    const result = await controllerFunds.getSingleFunds(
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
  fieldValidators.validate.funds,
  fieldValidators.validateResult,
  async (req, res) => {
    try {
      const result = await controllerFunds.createFunds(req.body, req.decoded);
      return respond(res, result);
    } catch (err) {
      return respond(res, err.message, false);
    }
  }
);

router.patch('/:id', validateUserToken, async (req, res) => {
  try {
    const result = await controllerFunds.updateFunds(
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
    const result = await controllerFunds.deleteFunds(
      req.params.id,
      req.decoded
    );
    return respond(res, result);
  } catch (err) {
    return respond(res, err.message, false);
  }
});

module.exports = router;
