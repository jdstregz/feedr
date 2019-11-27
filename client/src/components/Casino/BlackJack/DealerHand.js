import React from 'react';
import {Grid} from '@material-ui/core';
import cardImage from '../../../assets/images/cards/red_back.png'

import cards from './BlackJackCardMappings';

const DealerHand = props => {
  const {playerHand, playerStayed} = props;
  return (
    <Grid container spacing={1} justify={'center'} alignItems={'center'}>
      <Grid item xs={12}>
        {playerHand.map((card, index) => {
          const valueSuite = card.value + card.suite;
          if (index === 0 && !playerStayed) {
            return (
              <img alt={'hidden card'} src={cardImage} style={{width: 100}}/>
            )
          }
          return (
            <img alt={'playerCard'} src={cards[valueSuite]} style={{width:100}}/>
          )})}
      </Grid>
    </Grid>
  )
}

export default DealerHand;