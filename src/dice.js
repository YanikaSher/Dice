import DiceBox from "@3d-dice/dice-box";
const button = document.querySelector(".button-get-result");
const diceInput = document.querySelector(".dice-input");
const diceValues = document.querySelector(".dice-value-output");

function getValueOfDices(diceArray) {
  return diceArray.reduce((a, b)=> a.value+b.value)
}

const diceBox = new DiceBox(".dice-table", {
  assetPath: "/assets/",
  themeColor: "#4f463e",
  scale: 6,
  theme: "diceOfRolling"
});

diceBox.init().then(() => {
  button.addEventListener("click", () => {
    const diceInputValue = diceInput.value;

    diceBox.roll(diceInputValue).then((rollResults) => {
      diceValues.textContent = getValueOfDices(rollResults);
    });
  });
});

diceInput.addEventListener("click", (event) => {
  console.log(diceInput.value);
});
