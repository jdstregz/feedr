const SPADE = "S";
const HEART = "H";
const DIAMOND = "D";
const CLUB = "C";
const TWO = '2';
const THREE = '3';
const FOUR = '4';
const FIVE = '5';
const SIX = '6';
const SEVEN = '7';
const EIGHT = '8';
const NINE = '9';
const TEN = '10';
const JACK = 'J';
const QUEEN = 'Q';
const KING = 'K';
const ACE = 'A';

const SUITES = [SPADE, CLUB, DIAMOND, HEART];
const VALUES = [TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT, NINE, TEN, JACK, QUEEN, KING, ACE];

const cardValueMap = {
  '2' : 2,
  '3' : 3,
  '4' : 4,
  '5' : 5,
  '6' : 6,
  '7' : 7,
  '8' : 8,
  '9' : 9,
  '10' : 10,
  'J' : 10,
  'Q' : 10,
  'K' : 10,
  'A' : 11,
};

class Card {
  constructor(suite, value) {
    this.suite = suite;
    this.value = value;
  }
}

const shuffle = (deck) => {
  let currentIndex = deck.length;
  while(currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    const temp = deck[currentIndex];
    deck[currentIndex] = deck[randomIndex];
    deck[randomIndex] = temp;
  }
  return deck;
};

exports.createDeck = (numDecks) => {
  let deck = [];
  for (let i = 0; i < numDecks; i += 1) {
    for (const suite of SUITES) {
      for (const value of VALUES) {
        const card = new Card(suite, value);
        deck.push(card);
      }
    }
  }
  deck = shuffle(deck);
  return deck;
};

exports.handHasAnAce = (hand) => {
  let hasAce = false;
  hand.forEach(card => {
    if (card.value === 'A') {
      hasAce = true;
    }
  });
  return hasAce;
};

exports.getValueFromHand = (hand) => {
  let value = 0;
  let aceCount = 0;
  hand.forEach(card => {
    if (card.value === 'A') {
      aceCount += 1;
    }
    value += cardValueMap[card.value];
  });
  if (aceCount > 0) {
    if (value < 22) {
      return value;
    }
    for (let i = 0; i < aceCount; i += 1) {
      value -= 10;
      if (value < 22) {
        return value;
      }
    }
  }
  return value;
};

