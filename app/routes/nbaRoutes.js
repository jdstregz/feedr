const express = require('express');
const passport = require('passport');
const OddsController = require('../controllers/odds');

const jwtRequired = passport.authenticate('jwt', { session: false });

const router = express.Router();

router.get('/odds', jwtRequired, OddsController.getNBAOdds);

module.exports = router;
