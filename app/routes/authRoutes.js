const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const logger = require('../config/winston');

const jwtRequired = passport.authenticate('jwt', { session: false });

const router = express.Router();

router.post('/signup', passport.authenticate('signup', { session: false }), async (req, res) => {
  res.send('success');
});

router.post('/login', async (req, res, next) => {
  logger.info('Attempting login');
  passport.authenticate('login', { session: false }, async (error, user) => {
    try {
      if (error || !user) {
        logger.error(`An error occurred during login: ${error} - User: ${user}`);
        return next(error);
      }
      const userReturnObject = {
        _id: user._id,
        username: user.username,
        name: user.name,
      };
      req.session.jwt = jwt.sign(userReturnObject, process.env.JWT_SECRET_KEY);
      return res.send(userReturnObject);
    } catch (err) {
      logger.error(`An error occurred during login: ${err}`);
      return next(err);
    }
  })(req, res, next);
});

router.get('/current-session', (req, res) => {
  jwt.verify(req.session.jwt, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
    if (err || !decodedToken) {
      res.send(null);
    } else {
      res.send(decodedToken);
    }
  });
});

router.get('/logout', (req, res) => {
  req.session = null;
  res.send('Successfully logged out.');
});

router.get('/secure-route', jwtRequired, (req, res) => {
  res.send({ message: 'You have reached the protected endpoint' });
});

module.exports = router;
