import React, {useEffect} from 'react';
import { Grid, Paper, Button} from '@material-ui/core';
import {connect} from 'react-redux';
import useStyles from './styles/BlackJack.styles'
import Typography from '@material-ui/core/Typography';
import {fetchSimulation, startSimulation, dealSimulation, hitSimulation, staySimulation} from '../../../actions/blackJackActions';
import cardImage from '../../../assets/images/cards/red_back.png'
import * as BlackJackUtilityFunction from './blackjackUtilities';
import BlackJackHand from './BlackJackHand';
import DealerHand from './DealerHand';

const BlackJackSimulator = props => {
  const {blackjack, fetchSimulation, startSimulation, dealSimulation, hitSimulation, staySimulation} = props;
  const [playerStayed, setPlayerStayed] = React.useState(false);
  const classes = useStyles();
  const FaceDownCard = () => <img className={classes.cardImage} alt={"hand"} src={cardImage}/>;

  useEffect(() => {
    fetchSimulation();
  }, [fetchSimulation]);

  const renderDealerHand = () => {
    if (blackjack && blackjack.sim && blackjack.sim.dealerHand) {
      const playerHand = blackjack.sim.dealerHand;
      return (
        <DealerHand playerStayed={playerStayed} playerHand={playerHand}/>
      )
    }
  };

  const renderPlayerHand = () => {
    console.log(blackjack.sim.hands[0])
    if (blackjack && blackjack.sim && blackjack.sim.hands && blackjack.sim.hands[0]) {
      const playerHand = blackjack.sim.hands[0];
      console.log(playerHand)
      return (
        <BlackJackHand playerHand={playerHand}/>
      )
    }
  };

  const renderDealerButtons = () => (
    <Grid container spacing={2} justify={'center'} alignItems={'center'}>
      <Grid item xs={6}>
        <Button variant={'contained'} color={'inherit'} fullWidth>Restart</Button>
      </Grid>
      <Grid item xs={6}>
        <Button variant={'contained'} color={'inherit'} fullWidth
                onClick={() => {
                  setPlayerStayed(false)
                  dealSimulation()
                }}
        >Deal</Button>
      </Grid>
    </Grid>
  )

  const renderPlayerButtons = () => (
    <Grid container spacing={2} justify={'center'} alignItems={'center'}>
      <Grid item xs={3}>
        <Button variant={'contained'} color={'inherit'} fullWidth onClick={() => hitSimulation()}>Hit</Button>
      </Grid>
      <Grid item xs={3}>
        <Button variant={'contained'} color={'inherit'} fullWidth
                onClick={() => {
                  staySimulation();
                  setPlayerStayed(true);
                }}
        >Stay</Button>
      </Grid>
      <Grid item xs={3}>
        <Button variant={'contained'} color={'inherit'} fullWidth>Double Down</Button>
      </Grid>
      <Grid item xs={3}>
        <Button variant={'contained'} color={'inherit'} fullWidth>Split</Button>
      </Grid>
    </Grid>
  );

  if (blackjack == null || blackjack.sim == null) {
    return (
      <div>
        Loading
      </div>
    )
  } else if (!blackjack.sim) {
    return (
      <Grid container spacing={5} alignItems={'center'} justify={'center'}>
        <Grid item xs={4} />
        <Grid item xs={4}>
          <Button fullWidth variant={'contained'} onClick={() => startSimulation()}>
            Start Simulation
          </Button>
        </Grid>
        <Grid item xs={4}/>
      </Grid>
    )
  }

  return (
    <Grid container justify={'center'} alignItems={'center'}>
      <Paper className={classes.stats}>
        <Grid container spacing={1} justify={'space-between'} alignItems={'flex-start'}>
          <Grid item xs={3}>
            <Typography>Round #: 1</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>Count: 0</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>Money: $100</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>% Change: 0%</Typography>
          </Grid>

        </Grid>
      </Paper>
      <Paper className={classes.table}>
        <Grid item xs={12}>
          {renderDealerButtons()}
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1} justify={'center'} alignItems={'center'}>
            <Grid item xs={12} style={{textAlign: 'center'}}>
              <Typography style={{textAlign: 'center'}}>
                DEALER
              </Typography>
              {renderDealerHand()}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <div style={{height: 150}}/>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1} justify={'center'} alignItems={'center'}>
            <Grid item xs={12} style={{textAlign: 'center'}}>
              <Typography style={{textAlign: 'center'}}>
                YOU
              </Typography>
              {renderPlayerHand()}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {renderPlayerButtons()}
        </Grid>
      </Paper>
    </Grid>
  )
};

const mapStateToProps = state => {
  return {
    blackjack: state.blackjack,
  }
};

export default connect(mapStateToProps, {fetchSimulation, startSimulation, dealSimulation, hitSimulation, staySimulation})(BlackJackSimulator);