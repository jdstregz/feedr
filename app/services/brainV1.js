const brain = require('brain.js');
const axios = require('axios');

const model = new brain.NeuralNetwork();

const parseData = async (teamStatsData, gameResultData) => {
  const exportData = [];
  try {
    const teamStatsData = await axios.get('https://api.mysportsfeeds.com/v2.1/pull/nfl/current/team_stats_totals.json', {
      auth: { username: '65c32743-4ae4-4243-9da1-8bec39', password: "MYSPORTSFEEDS" }
    });
    const teamDict = {};
    for (const team of teamStatsData.data.teamStatsTotals) {
      teamDict[team.team.abbreviation] = {
        passAttempts: team.stats.passing.passAttempts,
        passCompletions: team.stats.passing.passCompletions
      }
    }
    for (const game of gameResultData.games) {
      const gameData = {};
      const resultData = {}
      const { schedule } = game;
      const gameDay = new Date(schedule.startTime);
      const date = `${gameDay.getFullYear()}${(gameDay.getMonth() + 1).toString().padStart(2, '0')}${gameDay.getDate().toString().padStart(2, '0')}`
      const homeTeam = schedule.homeTeam.abbreviation;
      const awayTeam = schedule.awayTeam.abbreviation;
      gameData["homeTeamPassingAttempts"] = teamDict[homeTeam].passAttempts;
      gameData["homeTeamPassingCompletions"] = teamDict[homeTeam].passCompletions
      gameData["awayTeamPassingCompletions"] = teamDict[awayTeam].passCompletions
      gameData["awayTeamPassingAttempts"] = teamDict[awayTeam].passAttempts
      /*
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
      */


      const { score } = game;


      resultData.home = score.homeScoreTotal;
      resultData.away = score.awayScoreTotal;
      if (resultData.home != null) {
        console.log(gameData, resultData);
        exportData.push({ input: gameData, output: resultData });
      }
    }
  }
  catch (err) {
    console.log(err)
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
  iterations: 200000,
  log: false
};

const program = async () => {
  const data = await getDataForV1Analysis();
  const trainingData = model.train(data, options);
  console.log(trainingData);
  console.log(model.run({ homeTeamPassingAttempts: 348,
    homeTeamPassingCompletions: 213,
    awayTeamPassingCompletions: 260,
    awayTeamPassingAttempts: 408 }));
}

program();