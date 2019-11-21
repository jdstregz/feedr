import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import axios from 'axios';
import useStyles from '../styles/League.styles';
import Typography from '@material-ui/core/Typography';

const NBA = () => {
  const [odds, setOdds] = React.useState(null);
  const classes = useStyles();
  React.useEffect(() => {
    axios.get('/nba/odds').then(data => {
      setOdds(data.data);
    });
  }, []);

  return (
    <Grid className={classes.root} container spacing={1} justify={'center'} alignItems={'center'}>
      <Grid item xs={12}>
        <Paper>{odds ? odds.lastUpdatedOn : null}</Paper>
      </Grid>
      <Grid item xs={6}>
        {odds
          ? odds.gameLines.map(({ game, lines }) => (
              <Paper>
                <Typography>
                  {game.awayTeamAbbreviation} - {game.homeTeamAbbreviation}
                </Typography>
                <Typography>{game.startTime}</Typography>
              </Paper>
            ))
          : null}
      </Grid>
      <Grid item xs={6}></Grid>
    </Grid>
  );
};

export default NBA;
