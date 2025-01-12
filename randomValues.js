const maxDiceValue = 6;
const minDiceValue = 1;
const range = maxDiceValue - minDiceValue + minDiceValue;

function getDiceRandomValue() {
  const randomValue = Math.random() * range;
  const result= Math.ceil(randomValue)
  return  result;
}
function convertRandomValue(randomValue) {
  if (randomValue === 6) {
    return { x: Math.PI, y:0.2, z: 0.3 };
  }
  if (randomValue === 3) {
    return { x: Math.PI / 2, y: 0, z: -0.3 };
  }
  if (randomValue === 4) {
    return { x: -Math.PI / 2, y: 0, z: 0.3 };
  }
  if (randomValue === 2) {
    return { x: 0, y: Math.PI / 2, z: 0.3 };
  }
  if (randomValue === 1) {
    return { x: 0, y: -Math.PI / 2, z: 0.3 };
  }
  if (randomValue === 5) {
    return { x: 0, y: 0, z: 0.3 };
  }
}

export { getDiceRandomValue, convertRandomValue };
