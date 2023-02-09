const mongoose = require('mongoose');

const savingsSchema = new mongoose.Schema(
  {
    nameOfSavings: {
      type: String,
      required: [true, 'Name of Savings is required'],
    },
    value: { type: Number, required: [true, 'Value of Savings is required'] },
    createdByUser: { type: mongoose.Schema.Types.ObjectId, ref: 'model.users' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Savings', savingsSchema);
