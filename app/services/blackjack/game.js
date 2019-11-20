const Utilities = require('./utilities');

const startGame = (numDecks) => {
  const shoe = Utilities.createDeck(numDecks);
  const shuffledShoe = Utilities.shuffle(shoe);

};