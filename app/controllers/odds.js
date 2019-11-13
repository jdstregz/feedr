const axios = require('axios');
const logger = require('../config/winston');

exports.getOdds = async (req, res) => {
  try {
    const {data} = await axios.get('https://api.mysportsfeeds.com/v2.1/pull/nba/2019-2020-regular/date/20191113/odds_gamelines.json', {
      auth: {username: process.env.FEEDR_API_KEY, password: "MYSPORTSFEEDS"}
    });
    return res.send(data);
  } catch (err) {
    logger.error(err);
    return res.status(500).send({
      message: "An error occurred while retrieving odds"
    })
  }
};