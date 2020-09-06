"use strict";
class Exox {
    constructor(xScore, oScore, gameStatusBox) {
        this.xScore = xScore;
        this.oScore = oScore;
        this.gameStatusBox = gameStatusBox;
        this.isGameOn = false;
        this.roundWinner = "";
        this.gameMoves = [];
        this.playerOnMove = `X`;
        this.totalScore = [];
        // helper methods
        this.createPlayerIcon = () => `<span data-player-icon class="player-icon">${this.playerOnMove}</span>`;
        this.changePlayer = () => (this.playerOnMove = this.playerOnMove === "X" ? "O" : "X");
        this.createMessageBox = (message) => `
        <span id="winner-icon" class="player-icon ${this.roundWinner && "win-icon"} hidden">${this.playerOnMove}</span>
        <span
          id="game-message"
          class="text-white text-4xl text-shadow font-black"
          >${message}</span
        >`;
        this.insertIcon = (target) => {
            if (!this.isGameOn)
                return;
            // if (target.hasChildNodes()) return;
            target.innerHTML = this.createPlayerIcon();
            this.gameMoves.push(this.playerOnMove);
            // target.removeEventListener("click", clickListener, false)
            // just test
            // console.log("game moves:", this.gameMoves);
            // console.log("player on move:", this.playerOnMove);
        };
        this.checkGameStatus = (dataset) => {
            // just testing score so far
            // console.log(this.totalScore)
            if (!this.isGameOn)
                return;
            const currentPlayerMoves = this.gameMoves.filter((move) => move === this.playerOnMove);
            if (currentPlayerMoves.length < 3) {
                this.changePlayer();
                return;
            }
            // passed 3 check
            // console.log(dataset.cellCol);
            // check if there are any other elements with this column
            const columnCells = document.querySelectorAll(`[data-cell-col='${dataset.cellCol}']`);
            const currentPlayerColumnCells = Array.from(columnCells).filter((cell) => { var _a; return ((_a = cell.textContent) === null || _a === void 0 ? void 0 : _a.trim()) === this.playerOnMove; });
            if (currentPlayerColumnCells.length === 3) {
                this.roundWinner = this.playerOnMove;
                this.totalScore.push(this.roundWinner);
                this.isGameOn = false;
                this.displayGameScore();
                return;
            }
            // check if there are any other elements with this row
            const currentPlayerRowCells = Array.from(document.querySelectorAll(`[data-cell-row='${dataset.cellRow}']`)).filter((cell) => { var _a; return ((_a = cell.textContent) === null || _a === void 0 ? void 0 : _a.trim()) === this.playerOnMove; });
            if (currentPlayerRowCells.length === 3) {
                this.roundWinner = this.playerOnMove;
                this.totalScore.push(this.roundWinner);
                this.isGameOn = false;
                this.displayGameScore();
                return;
            }
            // check if there are any other elements on the diagonal
            // first check if cell is on a diagonal
            if (Boolean(dataset.cellDg1)) {
                const currentPlayerDiagonal1Cells = Array.from(document.querySelectorAll("[data-cell-dg1='true']")).filter((cell) => { var _a; return ((_a = cell.textContent) === null || _a === void 0 ? void 0 : _a.trim()) === this.playerOnMove; });
                if (currentPlayerDiagonal1Cells.length === 3) {
                    this.roundWinner = this.playerOnMove;
                    this.totalScore.push(this.roundWinner);
                    this.isGameOn = false;
                    this.displayGameScore();
                    return;
                }
            }
            if (Boolean(dataset.cellDg2)) {
                const currentPlayerDiagonal2Cells = Array.from(document.querySelectorAll("[data-cell-dg2='true']")).filter((cell) => { var _a; return ((_a = cell.textContent) === null || _a === void 0 ? void 0 : _a.trim()) === this.playerOnMove; });
                if (currentPlayerDiagonal2Cells.length === 3) {
                    this.roundWinner = this.playerOnMove;
                    this.totalScore.push(this.roundWinner);
                    this.isGameOn = false;
                    this.displayGameScore();
                    return;
                }
            }
            // checking moves aarray lenght to see if the game is over
            if (this.gameMoves.length < 6)
                return this.changePlayer();
            // console.log("The game ended in a tie!");
            this.isGameOn = false;
            this.displayGameScore();
            return;
        };
        this.startNewGame = (gameCells) => {
            gameCells.forEach((cell) => {
                cell.innerHTML = "";
            });
            // resetting event listeners
            // gameCells.forEach((cell) => {
            //   cell.addEventListener(
            //     "click",
            //     (event: Event) => {
            //       exoxGame.insertIcon(event.currentTarget as HTMLDivElement);
            //       exoxGame.checkGameStatus(
            //         (event.currentTarget as HTMLDivElement).dataset as CellLocation
            //       );
            //       exoxGame.displayGameStatus();
            //     },
            //     { once: true }
            //   );
            // });
            this.isGameOn = true;
            this.gameMoves = [];
            this.roundWinner = "";
            this.playerOnMove = `X`;
        };
        this.displayGameStatus = () => {
            // updating the box
            // regular move
            if (this.isGameOn)
                return (this.gameStatusBox.innerHTML = this.createMessageBox("to move"));
            // game is not on and no winner
            if (!this.roundWinner)
                return (this.gameStatusBox.innerHTML = this.createMessageBox("Game Over"));
            // game is not on and we have a winner
            return (this.gameStatusBox.innerHTML = this.createMessageBox("Wins!"));
        };
        this.displayGameScore = () => {
            console.log("total score:", this.totalScore);
            const xWins = this.totalScore.reduce((acc, val) => {
                if (val === "X")
                    return acc + 1;
                return acc;
            }, 0);
            const oWins = this.totalScore.reduce((acc, val) => {
                if (val === "O")
                    return acc + 1;
                return acc;
            }, 0);
            console.log("xScore:", xWins);
            console.log("oScore:", oWins);
            this.xScore.textContent = xWins.toString();
            this.oScore.textContent = oWins.toString();
        };
        this.resetGame = (gameCells) => {
            gameCells.forEach((cell) => {
                cell.innerHTML = "";
            });
            this.isGameOn = true;
            this.roundWinner = "";
            this.gameMoves = [];
            this.playerOnMove = `X`;
            this.totalScore = [];
            this.displayGameScore();
            this.displayGameStatus();
        };
        this.isGameOn = true;
    }
}
// dom selectors
const playerXScore = document.getElementById("x-score");
const playerOScore = document.getElementById("o-score");
const playGridCells = document.querySelectorAll("[data-game-cell]");
const gameStatusScreen = document.getElementById("game-status");
const newGameBtn = document.getElementById("new-game-button");
const resetScoreBtn = document.getElementById("reset-score-button");
// game instance
const exoxGame = new Exox(playerXScore, playerOScore, gameStatusScreen);
// event listeners
const clickListener = (event) => {
    exoxGame.insertIcon(event.currentTarget);
    exoxGame.checkGameStatus(event.currentTarget.dataset);
    exoxGame.displayGameStatus();
};
//
// playGridCells.forEach((cell) => {
//   cell.addEventListener("click", clickListener, { once: true });
// });
playGridCells.forEach((cell) => {
    cell.addEventListener("click", clickListener);
});
newGameBtn.addEventListener("click", () => {
    exoxGame.startNewGame(playGridCells);
});
resetScoreBtn.addEventListener("click", () => {
    exoxGame.resetGame(playGridCells);
});
// dont need
const winnerCharacter = document.getElementById("winner-icon");
const gameMessage = document.getElementById("game-message");
//# sourceMappingURL=app.js.map