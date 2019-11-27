const express = require('express');
const passport = require('passport');
const BlackJackController = require('../controllers/blackjack');

const jwtRequired = passport.authenticate('jwt', { session: false });

const router = express.Router();

router.get('/get-sim', jwtRequired, BlackJackController.getSimulation);
router.post('/start-sim', jwtRequired, BlackJackController.startNewSimulation);
router.get('/deal-sim', jwtRequired, BlackJackController.deal);
router.get('/hit-sim', jwtRequired, BlackJackController.simulatorHit);
router.get('/stay-sim', jwtRequired, BlackJackController.simulatorStay);
module.exports = router;
