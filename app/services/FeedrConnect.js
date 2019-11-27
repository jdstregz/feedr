const mongoose = require('mongoose');
const logger = require('../config/winston');

const FeedrRecord = mongoose.model('FeedrRecord');


exports.findOrRequestCreateDataRecord = async (request, sport, season) => {
  try {
    const record = FeedrRecord.findOne({request});
    if (record) {
      return record;
    }

  } catch (err) {
    logger.error(err);
    return null;
  }
};