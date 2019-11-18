const brain = require('brain.js');
const axios = require('axios');

const model = new brain.NeuralNetwork();

const parseData = async (teamStatsData, gameResultData) => {
  const exportData = [];
  for (const game of gameResultData.games) {
    const gameData = {};
    const resultData = {}
    const {schedule} = game;
    const gameDay = new Date(schedule.startTime);
    const date = `${gameDay.getFullYear()}${(gameDay.getMonth() + 1).toString().padStart(2, '0')}${gameDay.getDate().toString().padStart(2, '0')}`
    const homeTeam = schedule.homeTeam.id;
    const awayTeam = schedule.awayTeam.id;
    try {
      const homeTeamData = (await axios.get(`https://api.mysportsfeeds.com/v2.1/pull/nfl/current/team_stats_totals.json?date=${date}&team=${homeTeam}`, {
        auth: { username: '65c32743-4ae4-4243-9da1-8bec39', password: "MYSPORTSFEEDS" }
      })).data;
      const awayTeamData = (await axios.get(`https://api.mysportsfeeds.com/v2.1/pull/nfl/current/team_stats_totals.json?date=${date}&team=${awayTeam}`, {
        auth: { username: '65c32743-4ae4-4243-9da1-8bec39', password: "MYSPORTSFEEDS" }
      })).data;


      gameData.homeTeamWins = homeTeamData.teamStatsTotals[0].stats.standings.wins;
      gameData.homeTeamLosses = homeTeamData.teamStatsTotals[0].stats.standings.losses;
      // gameData["homeTeamPointsFor"] = homeTeamData.teamStatsTotals[0].stats.standings.pointsFor;
      // gameData["homeTeamPointsAgainst"] = homeTeamData.teamStatsTotals[0].stats.standings.pointsAgainst;

      gameData.awayTeamWins = awayTeamData.teamStatsTotals[0].stats.standings.wins;
      gameData.awayTeamLosses = awayTeamData.teamStatsTotals[0].stats.standings.losses;
      // gameData["awayTeamPointsFor"] = awayTeamData.teamStatsTotals[0].stats.standings.pointsFor;
      // gameData["awayTeamPointsAgainst"] = awayTeamData.teamStatsTotals[0].stats.standings.pointsAgainst;

      const {score} = game;


      resultData.home = score.homeScoreTotal;
      resultData.away = score.awayScoreTotal;
      if (resultData.home != null) {
        console.log(gameData, resultData);
        exportData.push({ input: gameData, output: resultData });
      }
    } catch (err) {
      console.log(err)
      break;
    }
  }
  return exportData;
};

const getDataForV1Analysis = async () => {
  const gameResultData = await axios.get('https://api.mysportsfeeds.com/v2.1/pull/nfl/current/games.json', {
    auth: {username: '65c32743-4ae4-4243-9da1-8bec39', password: "MYSPORTSFEEDS"}
  });


  return parseData(null, gameResultData.data);
};

const options = {
  iterations: 20000,
  log: false
};

const program = async () => {
  const data = await getDataForV1Analysis();
  const trainingData = model.train(data, options);
  console.log(trainingData);
  console.log(model.run({ KC: 0, LAC: 1 }));
}

program();