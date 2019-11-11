/*
Server
author: jstreger
date: 11/11/19
 */
const express = require('express');
const environment = require('dotenv');
const path = require('path');
const morgan = require('morgan');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const passport = require('passport');

const envFile = process.env.NODE_ENV ? `config/.env.${process.env.NODE_ENV}` : 'config/.env';
environment.config({ path: path.resolve(__dirname, envFile) });

const logger = require('./config/winston');

// Services
// require('./services/passport');

logger.info('Application initializing.');
const app = express();

// Applies smaller middleware functions that set HTTP res headers.
// https://helmetjs.github.io/docs/
app.use(helmet());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

const secureCookies = process.env.NODE_ENV === 'production';
app.set('trust proxy', 1);
/* in the future we should have specified trusted proxies
app.set('trust proxy', function (ip) {
  if (ip === '127.0.0.1' || ip === '123.123.123.123') return true // trusted IPs
  else return false
})
 */
logger.debug(`Using secure cookies: ${secureCookies}`);
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // 1 day required login
    keys: [process.env.COOKIE_KEY],
    secure: secureCookies, // should always be true in production,
    httpOnly: true,
    expires: 60 * 60 * 1000, // 1 hour required active
  }),
);

const morganFormat = 'combined';
app.use(morgan(morganFormat, { stream: process.stdout }));

app.use(passport.initialize());

const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
  logger.info(`App listening on port ${PORT}`);
});

module.exports = app;
