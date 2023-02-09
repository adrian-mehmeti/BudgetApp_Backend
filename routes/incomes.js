const express = require('express');
const router = express.Router();
const controllerIncomes = require('../controllers/controller.incomes');
const { respond } = require('../lib/responder');
const { validateUserToken } = require('../lib/tokenValidators');
const fieldValidators = require('../lib/fieldValidators');

router.get('/:month/:year', validateUserToken, async (req, res) => {
  try {
    const { month, year } = req.params;
    const result = await controllerIncomes.getIncomes(req.decoded, month, year);
    return respond(res, result);
  } catch (err) {
    return respond(res, err.message, false);
  }
});

router.get('/:id', validateUserToken, async (req, res) => {
  try {
    const result = await controllerIncomes.getSingleIncomes(
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
  fieldValidators.validate.incomes,
  fieldValidators.validateResult,
  async (req, res) => {
    try {
      const result = await controllerIncomes.createIncomes(
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
    const result = await controllerIncomes.updateIncomes(
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
    const result = await controllerIncomes.deleteIncomes(
      req.params.id,
      req.decoded
    );
    return respond(res, result);
  } catch (err) {
    return respond(res, err.message, false);
  }
});

module.exports = router;
