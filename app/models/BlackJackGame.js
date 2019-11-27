const mongoose = require('mongoose');

const { Schema } = mongoose;

const CardSchema = new Schema({
  suite: String,
  value: String
},   { timestamps: true },);

const HandSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  placement: Number,
  hand: [CardSchema],
  value: Number,
},   { timestamps: true },);

const ShoeSchema = new Schema({
  shoe: [CardSchema],
  numDecks: Number
},   { timestamps: true },);

const BlackJackGameSchema = new Schema(
  {
    shoe: ShoeSchema,
    dealerHand: [CardSchema],
    hands: [HandSchema],
    host: {type: Schema.Types.ObjectId, ref: 'User'},
  },
  { timestamps: true },
);

HandSchema.methods.clearHands = () => {
  this.hand = [];
};

BlackJackGameSchema.methods.clearHands = () => {
  this.dealerHand = [];
  if (this.hands && this.hands.length > 0) {
    this.hands.forEach(playerhand => {
      playerhand.clearHands();
    });
  }
};

mongoose.model('Shoe', ShoeSchema);
mongoose.model('Hand', HandSchema);
mongoose.model('Card', CardSchema);
mongoose.model('BlackJackGame', BlackJackGameSchema);
