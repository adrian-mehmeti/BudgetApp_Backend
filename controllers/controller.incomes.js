const Incomes = require('../models/model.incomes');
const getDates = require('../lib/getDates');

module.exports = {
  getIncomes: async (userId, month, year) => {
    const { dateFirst, dateLast } = getDates(month, year);
    const allIncomes = await Incomes.find({
      createdByUser: userId,
      createdAt: { $gte: dateFirst, $lt: dateLast },
    });

    return allIncomes;
  },
  getSingleIncomes: async (id, userId) => {
    const singleIncome = await Incomes.findOne({
      _id: id,
      createdByUser: userId,
    });
    if (!singleIncome) {
      throw Error(`No Incomes exits with id=${id}`);
    }

    return singleIncome;
  },
  createIncomes: async (body, userId) => {
    const { incomesMonthly, value } = body;
    const incomeCreated = Incomes.create({
      incomesMonthly,
      value,
      createdByUser: userId,
    });
    return incomeCreated;
  },
  updateIncomes: async (id, body, userId) => {
    const incomeUpdated = await Incomes.findOneAndUpdate(
      { _id: id, createdByUser: userId },
      body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!incomeUpdated) {
      throw Error(`No Incomes with id=${id}`);
    }
    return incomeUpdated;
  },
  deleteIncomes: async (id, userId) => {
    const incomeDeleted = await Incomes.findOneAndDelete({
      _id: id,
      createdByUser: userId,
    });
    if (!incomeDeleted) {
      throw Error(`No Incomes with id=${id}`);
    }
    return incomeDeleted;
  },
};
