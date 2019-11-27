const mongoose = require('mongoose');
const logger = require('../config/winston');
const blackJackGameUtilties = require('../services/blackjack/game');

const BlackJackGame = mongoose.model('BlackJackGame')

exports.getSimulation = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).send({
        message: 'Unauthorized'
      })
    }
    const game = await BlackJackGame.findOne({host: req.user._id});
    return res.send(game);
  } catch (err) {
    logger.error(`An error occurred when retrieving a user simulation: ${err}`);
    return res.status(500).send({
      message: "An error occurred when retrieving a user simulation."
    })
  }
};

exports.startNewSimulation = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).send({
        message: 'Unauthorized'
      })
    }
    await BlackJackGame.deleteOne({host: req.user._id});
    let numDecks = 8;
    if (req.body.numDecks) {
      numDecks = req.body.numDecks;
    }
    const game = await blackJackGameUtilties.startNewSim(numDecks, req.user._id);
    return res.send(game);
  } catch (err) {
    logger.error(`An error occurred when starting new blackjack simulation: ${err}`);
    return res.status(500).send({
      message: "An error occurred when starting a new simulation."
    })
  }
};

exports.deal = async (req, res) => {
  try {
    let game = await BlackJackGame.findOne({host: req.user._id});
    if (!game) {
      return res.status(404).send({
        message: "couldn't find game"
      })
    }
    game = await blackJackGameUtilties.dealNewHands(game);
    return res.send(game);
  } catch (err) {
    logger.error(`An error occurred: ${err}`);
    return res.status(500).send({
      message: "An error occurred"
    })
  }
};

exports.simulatorHit = async (req, res) => {
  try {
    const game = await BlackJackGame.findOne({host: req.user._id});
    if (!game) {
      return res.status(404).send({
        message: "couldn't find game"
      })
    }
    if (!blackJackGameUtilties.verifyNoBusts(game)) {
      return res.status(400).send({
        message: "can't hit a busted hand"
      })
    }
    const card = game.shoe.shoe.pop();
    game.hands[0].hand.push(card);
    await game.save();
    res.send(game);
  } catch (err) {
    logger.error(`An error occurred: ${err}`);
    return res.status(500).send({
      message: "An error occurred"
    })
  }
};

exports.simulatorStay = async (req, res) => {
  try {
    let game = await BlackJackGame.findOne({host: req.user._id});
    if (!game) {
      return res.status(404).send({
        message: "couldn't find game"
      })
    }
    game = await blackJackGameUtilties.dealerHit(game);
    return res.send(game);
  } catch (err) {
    logger.error(`An error occurred: ${err}`);
    return res.status(500).send({
      message: "An error occurred"
    })
  }
}