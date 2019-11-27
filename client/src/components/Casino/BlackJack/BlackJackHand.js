import React from 'react';
import {Grid} from '@material-ui/core';
import cards from './BlackJackCardMappings';

const BlackJackHand = props => {
  const {playerHand} = props;
  const valueSuite = playerHand.hand.value + playerHand.hand.suite;
  console.log(valueSuite)
  return (
    <Grid container spacing={1} justify={'center'} alignItems={'center'}>
      <Grid item xs={12}>
        {playerHand.hand.map(card => {
          const valueSuite = card.value + card.suite;
          return (
          <img alt={'playerCard'} src={cards[valueSuite]} style={{width:110}}/>
          )})}
      </Grid>
    </Grid>
  )
}

export default BlackJackHand