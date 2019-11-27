import React from 'react';
import {Grid, Button} from '@material-ui/core';
import {Link} from 'react-router-dom';

const BlackJack = () => {
  return (
    <Grid container spacing={5} justify={'center'} alignItems={'center'}>
      <Grid item xs={6}>
        <Button component={Link} to={'/blackjack-simulator'} fullWidth variant={'contained'} color={'inherit'}>
          Simulator
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button fullWidth variant={'contained'} color={'inherit'}>
          Live Lobby
        </Button>
      </Grid>

    </Grid>
  )
};

export default BlackJack;