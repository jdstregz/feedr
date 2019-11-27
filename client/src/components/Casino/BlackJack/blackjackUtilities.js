export const hasHand = (game) => {
  return game && game.hands && game.hands[0] && game.hands[0].hand == null;
};