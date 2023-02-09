const express = require('express');
const router = express.Router();
const controllerOutcomes = require('../controllers/controller.outcomes');
const { respond } = require('../lib/responder');
const { validateUserToken } = require('../lib/tokenValidators');
const fieldValidators = require('../lib/fieldValidators');

router.get('/:month/:year', validateUserToken, async (req, res) => {
  try {
    const { month, year } = req.params;
    const result = await controllerOutcomes.getOutcomes(
      req.decoded,
      month,
      year
    );
    return respond(res, result);
  } catch (err) {
    return respond(res, err.message, false);
  }
});

router.get('/:id', validateUserToken, async (req, res) => {
  try {
    const result = await controllerOutcomes.getSingleOutcomes(
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
  fieldValidators.validate.outcomes,
  fieldValidators.validateResult,
  async (req, res) => {
    try {
      const result = await controllerOutcomes.createOutcomes(
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
    const result = await controllerOutcomes.updateOutcomes(
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
    const result = await controllerOutcomes.deleteOutcomes(
      req.params.id,
      req.decoded
    );
    return respond(res, result);
  } catch (err) {
    return respond(res, err.message, false);
  }
});

module.exports = router;
