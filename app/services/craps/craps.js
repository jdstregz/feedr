const roll = () => {
  const roll = Math.ceil(Math.random() * 6);
  return roll;
};

const rolls =  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

const sim = (bankroll, rounds, savePoint, startingBankroll, incrementSave, incrementDeposit, continueIfYourUp, survivalRounds) => {
  let saved = 0;
  for (let i = 0; i < rounds; i++) {
    if (bankroll < 40) {
      console.log("Oops we ran out of money");
      break;
    }
    if (bankroll > savePoint) {
      console.log(`We are saving some at round ${  i}`);
      saved += startingBankroll;
      bankroll -= startingBankroll;
    }
    if (saved >= savePoint && bankroll > incrementSave) {
      console.log("we are stashing some money")
      saved += incrementDeposit;
      bankroll -= incrementDeposit;
    }

    if (i === rounds - 1 && saved >= savePoint && bankroll >= incrementSave && continueIfYourUp) {
      i -= 1;
    }


    console.log(`Starting Round ${  i}`);
    console.log(`Bankroll starting at $${  bankroll}`);
    console.log("Placing bets on the 6 and 8 for 18 a piece")
    bankroll -= 36
    console.log(`Risking 36. Bankroll is $${  bankroll}`)
    const bets = [null, null, 0, 0, 0, 0, 18, null, 18, 0, 0, 0, 0];
    const payouts = [null, null, 30, 15, 2, 1.5, 1.2, null, 1.2, 1.5, 2, 15, 30];
    let stacked = false;
    let spread = false;
    let survival = 0;
    while (true) {
      const rollTotal = roll() + roll();
      rolls[rollTotal] += 1;
      console.log(`Rolling! You got a ${  rollTotal}`);

      // IF 7 then poop
      if (rollTotal === 7) {
        console.log("Aw shucks. Next time tiger. ");
        console.log(`Bankroll is $${  bankroll}`)
        break;
      }

      //
      if (!stacked && (rollTotal !== 8 && rollTotal !== 6)) {
        console.log("Don't matter next roll!");
      } else if (!stacked && (rollTotal === 6 || rollTotal === 8)) {
        console.log("Time to stack our bets");
        const winnings = Math.floor(payouts[rollTotal] * bets[rollTotal]);
        console.log(`We won winnings of $${  winnings}`);
        bankroll += winnings;
        bankroll -= 24;
        console.log("We will invest a few more bucks to get two stacks of 30");
        console.log(`Our bankroll is now $${  bankroll}`);
        bets[6] = 30;
        bets[8] = 30;
        stacked = true;
      } else if (stacked && !spread && rollTotal === 6 || rollTotal === 8) {
        console.log("Wooooo we hit it again, time to spread");
        const winnings = Math.floor(payouts[rollTotal] * bets[rollTotal]);
        console.log(`We won winnings of $${  winnings}`);
        bankroll += winnings;
        bankroll += 60;
        bankroll -= 96;
        console.log(`Our bankroll is now $${  bankroll}`);
        bets[4] = 15;
        bets[5] = 15;
        bets[6] = 18;
        bets[8] = 18;
        bets[9] = 15;
        bets[10] = 15;
        bets[2] = 1;
        bets[3] = 1;
        bets[11] = 1;
        bets[12] = 1;
        let total = 0;
        for (const bet of bets) {
          if (bet) {
            total += bet;
          }
        }
        console.log(`We now currently have $${  total  } on the board`);
        spread = true;
      } else if (spread && (rollTotal !== 2 && rollTotal !== 3 && rollTotal !== 11 && rollTotal !== 12)) {
        survival += 1;
        console.log(`Survived round ${  survival}`);
        const winnings = Math.floor(payouts[rollTotal] * bets[rollTotal])
        bankroll += winnings;
        console.log(`We won $${winnings} and are adding that to our bankroll and pushing 15`);
        bankroll -= 19;
        bets[rollTotal] += 15;
      } else if (spread && (rollTotal === 2 || rollTotal === 3 || rollTotal === 11 || rollTotal === 12)) {
        survival += 1;
        console.log(`Survived round ${  survival}`);
        const winnings = Math.floor(payouts[rollTotal] * bets[rollTotal])
        bankroll += winnings;
        bankroll -= 15;
        console.log(`We won $${winnings} and are adding that to our bankroll and pushing 15`);
        if (bets[6] >= bets[8]) {
          bets[8] += 15;
        } else {
          bets[6] += 15
        }
      }

      if (survival === survivalRounds) {
        console.log("You survived!")
        let total = 0;
        for (const bet of bets) {
          if (bet) {
            total += bet;
          }
        }
        console.log(`Total on the board was $${  total}`);
        console.log(`Bank roll was $${  bankroll}`);
        bankroll += total;
        console.log(`Bank roll is now $${  bankroll}`);
        break;
      }
    }
  }
  console.log(bankroll);
  console.log(saved);
  return bankroll + saved;
};

const results = [];
let wins = 0;
let losses = 0;
let maxWin = 0;
let averageWin = 0;
let averageLoss = 0;
const numRounds = 1000;
let winsOverDouble = 0;

for (let i = 0; i < numRounds; i += 1) {
  const result = sim(320, 30, 500, 320, 160, 80, false, 2);
  if (result >= 320) {
    wins += 1;
    averageWin += result;
    if (result >= 640) {
      winsOverDouble += 1;
    }
  } else if (result < 320) {
    losses += 1;
    averageLoss += result;
  }
  if (result > maxWin) {
    maxWin = result;
  }
  results.push(result);
}
console.log(results);
console.log(`Wins: ${  wins}`);
console.log(`Losses: ${  losses}`);
console.log(`Max Win: ${  maxWin}`);
console.log(`Average Loss: ${  averageLoss / losses}`)
console.log(`Average Win: ${  averageWin / wins}`);
console.log(`Wins over double: ${  winsOverDouble}`)
console.log(`Win percentage = ${  ((wins/numRounds)*100).toFixed(0)  }%` )