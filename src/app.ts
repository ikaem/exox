import Exox from "./exox";

// dom selectors
const playerXScore = document.getElementById("x-score") as HTMLSpanElement;
const playerOScore = document.getElementById("o-score") as HTMLSpanElement;
const gameGrid = document.getElementById("game-grid") as HTMLDivElement;
const gameStatusScreen = document.getElementById(
  "game-status"
) as HTMLDivElement;
const newGameBtn = document.getElementById(
  "new-game-button"
) as HTMLButtonElement;
const resetScoreBtn = document.getElementById(
  "reset-score-button"
) as HTMLButtonElement;

// game instance
const exoxGame = new Exox(
  playerXScore,
  playerOScore,
  gameStatusScreen,
  gameGrid
);

// event listeners
newGameBtn.addEventListener("click", () => {
  exoxGame.startNewGame();
});
resetScoreBtn.addEventListener("click", () => {
  exoxGame.resetGame();
});