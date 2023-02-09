const User = require('../models/model.users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  sendVerificationEmailAccount,
  sendResetPasswordEmail,
} = require('../lib/email');
const { USER_ROLE } = require('../lib/constants');

module.exports = {
  register: async body => {
    const { firstName, lastName, email, password, confirmPassword, telNumber } =
      body;

    if (password !== confirmPassword) {
      throw Error('Password doesnt match');
    }

    const hashPassword = bcrypt.hashSync(password, parseInt(process.env.SALT));
    const hashConfirmPassword = bcrypt.hashSync(
      confirmPassword,
      parseInt(process.env.SALT)
    );

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      confirmPassword: hashConfirmPassword,
      telNumber,
    });

    sendVerificationEmailAccount(user);

    delete user._doc.password;
    return user;
  },

  logIn: async body => {
    const { email, password } = body;

    const user = await User.findOne({ email }).exec();

    if (!user) {
      throw Error('User does not exits');
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw Error('Incorrent password');
    }

    if (!user.verified) {
      throw Error("User isn't verify");
    }

    const role = user.role;

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SERCRET);
    return { token, role };
  },

  verifyAccount: async token => {
    if (!token) {
      throw Error('Token not provided!');
    }
    const decoded = jwt.verify(token, process.env.JWT_VERIFICATION);

    const user = await User.findOne({ _id: decoded }).exec();
    if (!user) {
      throw Error('User does not exists');
    }

    await User.findOneAndUpdate(user._id, { verified: true }).exec();
    return true;
  },

  sendResetPassword: async email => {
    const user = await User.findOne({ email });
    if (!user) {
      throw Error('User does not exists');
    }
    sendResetPasswordEmail(user);
    return true;
  },

  resetPass: async (token, password, confirmPassword) => {
    if (!token) {
      throw Error('Token not provided');
    }
    const decoded = jwt.verify(token, process.env.JWT_VERIFICATION);
    if (password !== confirmPassword) {
      throw Error('Passowrd doesnt match');
    }
    const hashPassword = bcrypt.hashSync(password, parseInt(process.env.SALT));
    const hashConfirmPassword = bcrypt.hashSync(
      confirmPassword,
      parseInt(process.env.SALT)
    );
    await User.findOneAndUpdate(
      { _id: decoded },
      { password: hashPassword, confirmPassword: hashConfirmPassword }
    );
    return true;
  },

  createAdmin: async () => {
    const admin = await User.findOne({ role: USER_ROLE.ADMIN }).exec();

    const hashPassword = bcrypt.hashSync(
      process.env.ADMIN_PASSWORD,
      parseInt(process.env.SALT)
    );

    if (!admin) {
      await User.create({
        firstName: 'admin',
        lastName: 'admin',
        email: process.env.ADMIN_EMAIL,
        password: hashPassword,
        confirmPassword: hashPassword,
        telNumber: '04956632',
        verified: true,
        role: USER_ROLE.ADMIN,
      });
    }
  },
};
