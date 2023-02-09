const mongoose = require('mongoose');

const fundsSchema = new mongoose.Schema({
  nameOfFunds: { type: String, required: [true, 'Name of funds is required'] },
  maxValueToEarn: {
    type: Number,
    required: [true, 'Name of max value to earn is requied'],
  },
  currentValue: {
    type: Number,
    default: 0,
  },
  persentMonthly: {
    type: Number,
    required: [true, 'Persent Monthly is required'],
  },
  createdByUser: { type: mongoose.Schema.Types.ObjectId, ref: 'model.users' },
});

module.exports = mongoose.model('Funds', fundsSchema);
