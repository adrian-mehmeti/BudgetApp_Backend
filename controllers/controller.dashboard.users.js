const { USER_ROLE } = require('../lib/constants');
const User = require('../models/model.users');
const bcrypt = require('bcrypt');

module.exports = {
  getAllUsers: async () => {
    const allUsers = await User.find({ role: USER_ROLE.USER }).exec();
    return allUsers;
  },

  getSingleUser: async id => {
    const singleUser = await User.findOne({ _id: id }).exec();
    if (!singleUser) {
      throw Error(`No user with id = ${id}`);
    }
    return singleUser;
  },

  createUser: async body => {
    const { firstName, lastName, email, password, confirmPassword, telNumber } =
      body;
    const hashPassword = bcrypt.hashSync(password, parseInt(process.env.SALT));
    const hashConfirmPassword = bcrypt.hashSync(
      confirmPassword,
      parseInt(process.env.SALT)
    );
    const userCreated = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      confirmPassword: hashConfirmPassword,
      telNumber,
      verified: true,
    });
    return userCreated;
  },

  updateUser: async (id, body) => {
    const userUpdated = await User.findOneAndUpdate({ _id: id }, body, {
      new: true,
      runValidators: true,
    });

    if (!userUpdated) {
      throw Error(`No user with id = ${id}`);
    }
    return userUpdated;
  },

  deleteUser: async id => {
    const userDeleted = await User.findOneAndDelete({ _id: id });
    if (!userDeleted) {
      throw Error(`No user with id = ${id}`);
    }

    return userDeleted;
  },
};
