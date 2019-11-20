const mongoose = require('mongoose');

const { Schema } = mongoose;

const Card = new Schema({
  suite: String,
  value: String
},   { timestamps: true },);

const Hand = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  placement: Number,
  hand: [Card],
  value: Number,
},   { timestamps: true },);

const Shoe = new Schema({
  shoe: [String],
  hands: [Hand],
  turn: Number,
},   { timestamps: true },);

const BlackJackGameSchema = new Schema(
  {
    shoe: String,
    password: String,
    name: String,
    email: String,
  },
  { timestamps: true },
);

mongoose.model('BlackJackGame', BlackJackGameSchema);
