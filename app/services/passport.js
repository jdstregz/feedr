/*
Passport - Authentication Services
author: jstreger
date: 10/25/19
 */

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('User');
const logger = require('../config/winston');

passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      try {
        if (process.env.NODE_ENV === 'production') {
          // for the sake of a personal project, i don't want random users on this
          return done(null, false, { message: 'Unauthorized' });
        }
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          return done(null, false, { message: 'User already exists' });
        }
        logger.info(`Creating account for email: ${username}`);
        const user = await new User({
          username,
          email: req.body.email,
          password,
          name: req.body.name,
        });
        await user.encryptPassword();
        await user.save();
        return done(null, user);
      } catch (err) {
        logger.error(err);
        return done(err);
      }
    },
  ),
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async (username, password, done) => {
      try {
        logger.debug(`Finding use with email: ${username}`);
        const user = await User.findOne({ username });
        if (!user) {
          logger.debug('User not found');
          return done(null, false, { message: 'User not found' });
        }
        logger.debug('Found user, validating password');
        const validate = await user.validatePassword(password);
        if (!validate) {
          logger.debug('Password validation failed');
          return done(null, false, { message: 'Wrong password' });
        }
        return done(null, user);
      } catch (err) {
        logger.error(err);
        return done(err);
      }
    },
  ),
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: req => req.session.jwt,
      secretOrKey: process.env.JWT_SECRET_KEY,
    },
    (payload, done) => {
      return done(null, payload);
    },
  ),
);
