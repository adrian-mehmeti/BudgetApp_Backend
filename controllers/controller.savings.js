const Savings = require('../models/model.savings');

module.exports = {
  getSavings: async userId => {
    const allSavings = await Savings.find({ createdByUser: userId });
    return allSavings;
  },
  getSingleSavings: async (id, userId) => {
    const singleSaving = await Savings.findOne({
      _id: id,
      createdByUser: userId,
    });
    if (!singleSaving) {
      throw Error(`No savings exits with id=${id}`);
    }
    return singleSaving;
  },
  createSavings: async (body, userId) => {
    const { nameOfSavings, value } = body;
    const savingCreated = Savings.create({
      nameOfSavings,
      value,
      createdByUser: userId,
    });
    return savingCreated;
  },
  updateSavings: async (id, body, userId) => {
    const savingUpdated = await Savings.findOneAndUpdate(
      { _id: id, createdByUser: userId },
      body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!savingUpdated) {
      throw Error(`No savings with id=${id}`);
    }
    return savingUpdated;
  },
  deleteSavings: async (id, userId) => {
    const savingDeleted = await Savings.findOneAndDelete({
      _id: id,
      createdByUser: userId,
    });
    if (!savingDeleted) {
      throw Error(`No savings with id=${id}`);
    }
    return savingDeleted;
  },
};
