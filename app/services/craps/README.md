### Craps Strategy
This is a little test file to play around with the stats of a particular strategy I enjoy using at a craps game.

#### Strategy
This is under the assumption that the table is $15 minumum bet. 
1. Bet $18 place bets on the 6 and 8. Turn those bets on. Currently risking $36
2. If the 6 or the 8 get hit, you win ~$21, push those each up to $30 each. You only committed an extra $3 so you are currently risking $39.
3. If the 6 or the 8 get hit again, spread out $96 on all place numbers (4, 5, 6, 8, 9, 10). Place $4 on the horn bet (1-15 odds for 3 and 11, 1-30 odds for 2 and 12 [these are single roll bets])
. You've only committed another $1, so your total risk is $40. 
4. If any number besides a 7 gets rolled, you win $, but you will push that winnings onto the rolled number. If you rolled a 2, 3, 11, or 12, you will not place that bet on the horn, but rather pick a non-pushed place number to increase by 1 unit ($15).
5. Survive 5 rounds on rolls, and then immediately take all of your bets down.
6. Restart if you survived or if a 7 was rolled before the 5th survival round.

This strategy is risky as you are placing $40 for each attempt. But winnings after 5 rounds can end with good $

Current stat output for this with a starting bankroll of $320 is
```cmd
Wins: 480
Losses: 520
Max Win: 1945
Average Loss: 28.471153846153847
Average Win: 437.0708333333333
Wins over double: 39
Win percentage = 48%
```
Currently tweaking the strategy to allow for more wins over double. 