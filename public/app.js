import Exox from "./exox.js";
// dom selectors
const playerXScore = document.getElementById("x-score");
const playerOScore = document.getElementById("o-score");
const gameGrid = document.getElementById("game-grid");
const gameStatusScreen = document.getElementById("game-status");
const newGameBtn = document.getElementById("new-game-button");
const resetScoreBtn = document.getElementById("reset-score-button");
// game instance
const exoxGame = new Exox(playerXScore, playerOScore, gameStatusScreen, gameGrid);
// event listeners
newGameBtn.addEventListener("click", () => {
    exoxGame.startNewGame();
});
resetScoreBtn.addEventListener("click", () => {
    exoxGame.resetGame();
});
//# sourceMappingURL=app.js.map