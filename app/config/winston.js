/*
Author: jstreger
Date: 10/23/19
Winston - Logger configuration
 */

const { createLogger, format, transports } = require('winston');

const logLevel = process.env.LOG_LEVEL || 'info';
const logPath = process.env.LOG_PATH || 'log';

function formatParams(info) {
  const { timestamp, level, message, ...args } = info;
  const ts = timestamp.slice(0, 19).replace('T', ' ');
  return `${ts} ${level}: ${message} ${
    Object.keys(args).length ? JSON.stringify(args, '', '') : ''
  }`;
}

const developmentFormat = format.combine(
  format.colorize(),
  format.timestamp(),
  format.align(),
  format.printf(formatParams),
);

const productionFormat = format.combine(
  format.timestamp(),
  format.align(),
  format.printf(formatParams),
);

let logger;

if (process.env.NODE_ENV !== 'production') {
  logger = createLogger({
    logLevel,
    format: developmentFormat,
    transports: [
      new transports.Console({ level: logLevel }),
      new transports.File({ filename: `${logPath}/error.log`, level: 'error' }),
      new transports.File({ filename: `${logPath}/combined.log` }),
    ],
  });
} else {
  logger = createLogger({
    logLevel,
    format: productionFormat,
    transports: [
      new transports.Console({ level: logLevel }),
      new transports.File({ filename: `${logPath}/error.log`, level: 'error' }),
      new transports.File({ filename: `${logPath}/combined.log` }),
    ],
  });
}

module.exports = logger;
