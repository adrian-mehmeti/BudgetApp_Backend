const mongoose = require('mongoose');

const incomesSchema = new mongoose.Schema(
  {
    incomesMonthly: {
      type: String,
      required: [true, 'Incomes monthly is required'],
    },
    value: {
      type: Number,
      required: [true, 'Value in incomes monthly is required'],
    },
    createdByUser: { type: mongoose.Schema.Types.ObjectId, ref: 'model.users' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Incomes', incomesSchema);
