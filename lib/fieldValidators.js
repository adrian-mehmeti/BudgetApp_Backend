const { check, validationResult } = require('express-validator');
const User = require('../models/model.users');

module.exports = {
  validate: {
    register: [
      check('email', 'Email is not valid').isEmail(),
      check('email', 'Email field must not be empty').notEmpty(),
      check('email').custom(async value => {
        const user = await User.findOne({ email: value }).exec();
        if (user) {
          return Promise.reject('Email is already in use');
        }
      }),
      check('password', 'Password must have minimun 6 characters').isLength({
        min: 6,
      }),
      check('password', 'Password must not be empty').notEmpty(),
      check(
        'confirmPassword',
        'password must have minimun 6 characters'
      ).isLength({
        min: 6,
      }),
      check('confirmPassword', 'passwird must not be empty').notEmpty(),
    ],
    logIn: [
      check('email', 'Email is not valid').isEmail(),
      check('email', 'Email field must not be empty').notEmpty(),
      check('password', 'Password must not be empty').notEmpty(),
    ],
    resetPasswordEmail: [
      check('email', 'Email is not valid').isEmail(),
      check('email', 'Email field must not be empty').notEmpty(),
    ],
    resetPassword: [
      check('token', 'token field must not be empty').notEmpty(),
      check('token', 'token field must be a jwt token').isJWT(),
      check('password', 'password must have minimun 6 characters').isLength({
        min: 6,
      }),
      check('password', 'passwird must not be empty').notEmpty(),
      check(
        'confirmPassword',
        'password must have minimun 6 characters'
      ).isLength({
        min: 6,
      }),
      check('confirmPassword', 'passwird must not be empty').notEmpty(),
    ],
    incomes: [
      check('incomesMonthly', 'Monthly Incomes must not be empty').notEmpty(),
      check('value', 'Value for monthly incomes must not be empty').notEmpty(),
      check('value', 'Value for monthly income must be numeric').isNumeric(),
    ],
    outcomes: [
      check('nameOfOutcomes', 'Monthly outcomes must not be empty').notEmpty(),
      check('value', 'Value for monthly outcomes must not be empty').notEmpty(),
      check('value', 'Value for monthly outcomes must be numeric').isNumeric(),
    ],
    savings: [
      check('nameOfSavings', 'Savings must not be empty').notEmpty(),
      check('value', 'Value for savings must not be empty').notEmpty(),
      check('value', 'Value for savings must be numeric').isNumeric(),
    ],
    funds: [
      check('nameOfFunds', 'Name of funds must not be empty').notEmpty(),
      check('maxValueToEarn', 'Max value to earn must not be empty').notEmpty(),
      check('maxValueToEarn', 'Max value must be numeric').isNumeric(),
      check('currentValue', 'Max value to earn must not be empty').notEmpty(),
      check('currentValue', 'Max value must be numeric').isNumeric(),
      check(
        'persentMonthly',
        'Persent for monthly must not be empty'
      ).notEmpty(),
      check(
        'persentMonthly',
        'Persent for monthly must be numeric'
      ).isNumeric(),
    ],
    user: [
      check('firstName', 'First name must not be empty').notEmpty(),
      check('lastName', 'First name must not be empty').notEmpty(),
      check('email', 'Email is not valid').isEmail(),
      check('email', 'Email field must not be empty').notEmpty(),
      check('email').custom(async value => {
        const user = await User.findOne({ email: value }).exec();
        if (user) {
          return Promise.reject('Email is already in use');
        }
      }),
      check('password', 'Password must have minimun 6 characters').isLength({
        min: 6,
      }),
      check('password', 'Password must not be empty').notEmpty(),
      check(
        'confirmPassword',
        'password must have minimun 6 characters'
      ).isLength({
        min: 6,
      }),
      check('confirmPassword', 'passwird must not be empty').notEmpty(),
      check('telNumber', 'Telephone number must not be empty').notEmpty(),
    ],
  },
  validateResult: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      next();
    }
  },
};
