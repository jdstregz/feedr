const SPADE = "spade";
const HEART = "heart";
const DIAMOND = "diamond";
const CLUB = "club";
const TWO = 2;
const THREE = 3;
const FOUR = 4;
const FIVE = 5;
const SIX = 6;
const SEVEN = 7;
const EIGHT = 8;
const NINE = 9;
const TEN = 10;
const JACK = '10-jack';
const QUEEN = '10-queen';
const KING = '10-king';
const ACE = '1-11';

const SUITES = [SPADE, CLUB, DIAMOND, HEART];
const VALUES = [TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT, NINE, TEN, JACK, QUEEN, KING, ACE];

class Card {
  constructor(suite, value) {
    this.suite = suite;
    this.value = value;
  }
}

exports.shuffle = (deck) => {
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
  const deck = [];
  for (let i = 0; i < numDecks; i += 1) {
    for (const suite of SUITES) {
      for (const value of VALUES) {
        const card = new Card(suite, value);
        deck.push(card);
      }
    }
  }
  return deck;
};