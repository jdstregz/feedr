const mongoose = require('mongoose');

const { Schema } = mongoose;

const FeedrRecord = new Schema(
  {
    request: String,
    sport: String,
    season: String,
    email: String,
  },
  { timestamps: true },
);

mongoose.model('FeedrRecord', FeedrRecord);
