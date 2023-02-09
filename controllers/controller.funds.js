const Funds = require('../models/model.funds');

module.exports = {
  getFunds: async userId => {
    const allFunds = await Funds.find({ createdByUser: userId });
    return allFunds;
  },
  getSingleFunds: async (id, userId) => {
    const singleFund = await Funds.findOne({ _id: id, createdByUser: userId });
    if (!singleFund) {
      throw Error(`No Funds exits with id=${id}`);
    }
    return singleFund;
  },
  createFunds: async (body, userId) => {
    const { nameOfFunds, maxValueToEarn, currentValue, persentMonthly } = body;
    const fundCreated = Funds.create({
      nameOfFunds,
      maxValueToEarn,
      persentMonthly,
      currentValue,
      createdByUser: userId,
    });
    return fundCreated;
  },
  updateFunds: async (id, body, userId) => {
    const fundUpdated = await Funds.findOneAndUpdate(
      { _id: id, createdByUser: userId },
      body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!fundUpdated) {
      throw Error(`No Funds with id=${id}`);
    }
    return fundUpdated;
  },
  deleteFunds: async (id, userId) => {
    const fundDeleted = await Funds.findOneAndDelete({
      _id: id,
      createdByUser: userId,
    });
    if (!fundDeleted) {
      throw Error(`No Funds with id=${id}`);
    }
    return fundDeleted;
  },
};
