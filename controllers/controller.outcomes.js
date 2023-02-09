const Outcomes = require('../models/model.outcomes');
const getDates = require('../lib/getDates');

module.exports = {
  getOutcomes: async (userId, month, year) => {
    const { dateFirst, dateLast } = getDates(month, year);
    const allOutcomes = await Outcomes.find({
      createdByUser: userId,
      createdAt: { $gte: dateFirst, $lt: dateLast },
    });
    return allOutcomes;
  },
  getSingleOutcomes: async (id, userId) => {
    const singleOutcome = await Outcomes.findOne({
      _id: id,
      createdByUser: userId,
    });
    if (!singleOutcome) {
      throw Error(`No Outcomes exits with id=${id}`);
    }
    return singleOutcome;
  },
  createOutcomes: async (body, userId) => {
    const { nameOfOutcomes, value } = body;
    const outcomeCreated = Outcomes.create({
      nameOfOutcomes,
      value,
      createdByUser: userId,
    });
    return outcomeCreated;
  },
  updateOutcomes: async (id, body, userId) => {
    const outcomeUpdated = await Outcomes.findOneAndUpdate(
      { _id: id, createdByUser: userId },
      body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!outcomeUpdated) {
      throw Error(`No Outcomes with id=${id}`);
    }
    return outcomeUpdated;
  },
  deleteOutcomes: async (id, userId) => {
    const outcomeDeleted = await Outcomes.findOneAndDelete({
      _id: id,
      createdByUser: userId,
    });
    if (!outcomeDeleted) {
      throw Error(`No Outcomes with id=${id}`);
    }
    return outcomeDeleted;
  },
};
