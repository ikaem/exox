export default class Exox {
    constructor(xScore, oScore, gameStatusBox, gameCellsContainer) {
        this.xScore = xScore;
        this.oScore = oScore;
        this.gameStatusBox = gameStatusBox;
        this.gameCellsContainer = gameCellsContainer;
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
        this.createGridCell = () => {
            const gridCell = document.createElement("div");
            gridCell.classList.add("game-cell", "hover:bg-teal-400");
            gridCell.addEventListener("click", (event) => {
                this.insertIcon(event.currentTarget);
                this.checkGameStatus(event.currentTarget.dataset);
                this.displayGameStatus();
            }, { once: true });
            return gridCell;
        };
        this.removeGridCells = () => {
            while (this.gameCellsContainer.firstChild) {
                this.gameCellsContainer.removeChild(this.gameCellsContainer.firstChild);
            }
        };
        this.appendGridCells = () => {
            let col = 1;
            let row = 0;
            let dg1 = "";
            let dg2 = "";
            const cells = new Array(9).fill("");
            cells.map((_, index) => {
                // creating the cell
                const gridCell = this.createGridCell();
                if (col > 3)
                    col = 1;
                if (index % 3 === 0)
                    row++;
                if (index % 4 === 0)
                    dg1 = "true";
                if (index % 2 === 0 && index && index !== 8)
                    dg2 = "true";
                gridCell.dataset.cellCol = col.toString();
                gridCell.dataset.cellRow = row.toString();
                gridCell.dataset.cellDg1 = dg1;
                gridCell.dataset.cellDg2 = dg2;
                this.gameCellsContainer.appendChild(gridCell);
                col++;
                dg1 = "";
                dg2 = "";
            });
        };
        this.proclaimWinner = () => {
            this.roundWinner = this.playerOnMove;
            this.totalScore.push(this.roundWinner);
            this.isGameOn = false;
            this.displayGameScore();
        };
        this.insertIcon = (target) => {
            if (!this.isGameOn)
                return;
            target.innerHTML = this.createPlayerIcon();
            this.gameMoves.push(this.playerOnMove);
        };
        this.checkGameStatus = (dataset) => {
            if (!this.isGameOn)
                return;
            // checking to see how many moves current player made
            const currentPlayerMoves = this.gameMoves.filter((move) => move === this.playerOnMove);
            if (currentPlayerMoves.length < 3) {
                this.changePlayer();
                return;
            }
            // passed 3 player moves check
            // check if there are any other elements in this column
            const currentPlayerColumnCells = Array.from(document.querySelectorAll(`[data-cell-col='${dataset.cellCol}']`)).filter((cell) => { var _a; return ((_a = cell.textContent) === null || _a === void 0 ? void 0 : _a.trim()) === this.playerOnMove; });
            if (currentPlayerColumnCells.length === 3) {
                this.proclaimWinner();
                return;
            }
            // check if there are any other elements with this row
            const currentPlayerRowCells = Array.from(document.querySelectorAll(`[data-cell-row='${dataset.cellRow}']`)).filter((cell) => { var _a; return ((_a = cell.textContent) === null || _a === void 0 ? void 0 : _a.trim()) === this.playerOnMove; });
            if (currentPlayerRowCells.length === 3) {
                this.proclaimWinner();
                return;
            }
            // check if there are any other elements on the diagonal
            // first check if cell is on a diagonal
            if (Boolean(dataset.cellDg1)) {
                const currentPlayerDiagonal1Cells = Array.from(document.querySelectorAll("[data-cell-dg1='true']")).filter((cell) => { var _a; return ((_a = cell.textContent) === null || _a === void 0 ? void 0 : _a.trim()) === this.playerOnMove; });
                if (currentPlayerDiagonal1Cells.length === 3) {
                    this.proclaimWinner();
                    return;
                }
            }
            if (Boolean(dataset.cellDg2)) {
                const currentPlayerDiagonal2Cells = Array.from(document.querySelectorAll("[data-cell-dg2='true']")).filter((cell) => { var _a; return ((_a = cell.textContent) === null || _a === void 0 ? void 0 : _a.trim()) === this.playerOnMove; });
                if (currentPlayerDiagonal2Cells.length === 3) {
                    this.proclaimWinner();
                    return;
                }
            }
            // checking moves array lenght to see if the game is over
            if (this.gameMoves.length < 6)
                return this.changePlayer();
            // the game is a tie if current user has 3 moves, and hasnt won by now, and total number of moves is 6
            this.isGameOn = false;
            this.displayGameScore();
            return;
        };
        this.startNewGame = () => {
            this.removeGridCells();
            this.appendGridCells();
            this.isGameOn = true;
            this.gameMoves = [];
            this.roundWinner = "";
            this.playerOnMove = `X`;
        };
        this.displayGameStatus = () => {
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
            this.xScore.textContent = xWins.toString();
            this.oScore.textContent = oWins.toString();
        };
        this.resetGame = () => {
            this.removeGridCells();
            this.appendGridCells();
            this.isGameOn = true;
            this.roundWinner = "";
            this.gameMoves = [];
            this.playerOnMove = `X`;
            this.totalScore = [];
            this.displayGameScore();
            this.displayGameStatus();
        };
        this.resetGame();
    }
}
//# sourceMappingURL=exox.js.map