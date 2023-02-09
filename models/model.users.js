const mongoose = require('mongoose');
const { USER_ROLE } = require('../lib/constants');

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: [true, 'User name is required'] },
    lastName: { type: String, required: [true, 'User lastname is required'] },
    email: {
      type: String,
      lowercase: true,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: { type: String, required: [true, 'Password is required'] },
    confirmPassword: {
      type: String,
      required: [true, 'Password confirm is required'],
    },
    telNumber: { type: String, required: [true, 'Tel number is required'] },
    verified: { type: Boolean, default: false },
    role: {
      type: String,
      enum: Object.values(USER_ROLE),
      default: USER_ROLE.USER,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Users', userSchema);
