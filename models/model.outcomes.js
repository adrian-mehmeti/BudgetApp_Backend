const mongoose = require('mongoose');

const outcomesSchema = new mongoose.Schema(
  {
    nameOfOutcomes: {
      type: String,
      required: [true, 'Name of outcomes is required'],
    },
    value: {
      type: Number,
      required: [true, 'Value of outcomes is required'],
    },
    createdByUser: { type: mongoose.Schema.Types.ObjectId, ref: 'model.users' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Outcomes', outcomesSchema);
