const maxDiceValue = 6;
const minDiceValue = 1;
const range = (maxDiceValue - minDiceValue) + minDiceValue;

function getDiceRandomValue() {
  const randomValue = Math.random() * range;
  const roundedRandomValue = Math.ceil(randomValue);
  return roundedRandomValue;
}

export {getDiceRandomValue}