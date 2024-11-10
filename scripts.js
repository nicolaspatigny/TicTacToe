const gameBoard = document.querySelector(".container");
const cells = document.querySelectorAll(".cell");

let currentPlayer = "X";
let gameActive = true;
let boardState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => handleCellClick(cell, index));
});

function handleCellClick(cell, index) {
  if (boardState[index] === "" && gameActive) {
    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    if (checkWin()) {
      setTimeout(() => {
        alert(`Player ${currentPlayer} wins!`);
        resetGame();
      }, 100);
      return;
    }

    if (checkDraw()) {
      setTimeout(() => {
        alert("Game is a draw!");
        resetGame();
      }, 100);
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function resetGame() {
  currentPlayer = "X";
  gameActive = true;
  boardState = ["", "", "", "", "", "", "", "", ""];
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("x", "o");
  });
}

function checkWin() {
  for (let condition of winningConditions) {
    let [a, b, c] = condition;
    if (
      boardState[a] !== "" &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    ) {
      return true;
    }
  }
  return false;
}

function checkDraw() {
  return !boardState.includes("");
}
