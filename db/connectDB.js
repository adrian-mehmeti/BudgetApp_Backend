const mongoose = require('mongoose');
const authUserController = require('../controllers/controller.auth.users');

mongoose.set('strictQuery', true);

module.exports = {
  connect: () => {
    mongoose.connect(process.env.DATABASE_URL).then(() => {
      console.log('Connected!');
      authUserController.createAdmin();
    });
  },
};
