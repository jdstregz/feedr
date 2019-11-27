/* eslint-disable no-param-reassign */
const mongoose = require('mongoose')

const Utilities = require('./utilities');

const BlackJackGame = mongoose.model('BlackJackGame');
const Hand = mongoose.model('Hand');
const Shoe = mongoose.model('Shoe');

const createNewGame = async (numDecks, host) => {
  const shuffledShoe = Utilities.createDeck(numDecks);
  const shoe = new Shoe({
    shoe: shuffledShoe,
    numDecks,
  });

  const blackJackGame = new BlackJackGame({
    shoe,
    dealerHand: [],
    hands: [],
    host
  });
  await blackJackGame.save();
  return blackJackGame;
};

const addHandToGame = async (blackJackGame, user) => {
  const hand = new Hand({
    user,
    placement: null,
    hand: [],
  });
  blackJackGame.hands.push(hand);
  await blackJackGame.save();
  return blackJackGame;
};

exports.dealNewHands = async (game) => {
  game.dealerHand = [];
  if (game.hands && game.hands.length > 0) {
    for (let i = 0; i < game.hands.length; i += 1) {
      game.hands[i].hand = []
    }
  }
  const numPlayers = game.hands.length + 1;
  for (let i = 0; i < numPlayers * 2; i+=1) {
    const player = i % numPlayers;
    const card = game.shoe.shoe.pop();
    if (!game.hands[player]) {
      game.dealerHand.push(card);
    }
    else {
      game.hands[player].hand.push(card);
    }
  }
  await game.save();
  return game;
};

exports.hit = async (game) => {
  const card = game.shoe.shoe.pop();
  game.hands[0].hand.push(card);
  return game;
};

exports.dealerHit = async (game) => {
  let dealerStop = false;
  while (!dealerStop) {
    const dealerValue = Utilities.getValueFromHand(game.dealerHand)
    if (dealerValue > 17) {
      dealerStop = true;
    } else if (dealerValue === 17 && !Utilities.handHasAnAce(game.dealerHand)) {
      dealerStop = true;
    }
    if (!dealerStop) {
      const card = game.shoe.shoe.pop();
      game.dealerHand.push(card);
    }
  }
  await game.save();
  return game;
};

exports.verifyNoBusts = game => {
  return (Utilities.getValueFromHand(game.dealerHand) < 21 &&
    Utilities.getValueFromHand(game.hands[0].hand) < 21)
}

exports.startNewSim = async (numDecks, host) => {
  const game = await createNewGame(numDecks, host);
  return addHandToGame(game, host);
};