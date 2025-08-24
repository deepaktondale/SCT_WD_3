const boardEl  = document.getElementById("board");
const statusEl = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

let board = Array(9).fill("");
let currentPlayer = "X";
let running = true;

function buildBoard(){
  boardEl.innerHTML = "";
  board.forEach((_, i) => {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.dataset.index = i;
    cell.addEventListener("click", onCellClick);
    boardEl.appendChild(cell);
  });
}

function onCellClick(e){
  const i = +e.currentTarget.dataset.index;
  if (!running || board[i]) return;
  board[i] = currentPlayer;
  e.currentTarget.textContent = currentPlayer;
  e.currentTarget.classList.add("taken");

  const winLine = getWinningLine(board, currentPlayer);
  if (winLine){
    highlightWin(winLine);
    statusEl.textContent = `Player ${currentPlayer} wins! 🎉`;
    running = false;
    return;
  }

  if (board.every(c => c !== "")){
    statusEl.textContent = "It's a draw 🤝";
    running = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusEl.textContent = `Player ${currentPlayer}'s turn`;
}

function getWinningLine(cells, p){
  const lines = [
    [0,1,2], [3,4,5], [6,7,8], 
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]           
  ];
  for (const line of lines){
    const [a,b,c] = line;
    if (cells[a]===p && cells[b]===p && cells[c]===p) return line;
  }
  return null;
}

function highlightWin(line){
  [...boardEl.children].forEach((cell, idx) => {
    if (line.includes(idx)) cell.classList.add("win");
  });
}

resetBtn.addEventListener("click", () => {
  board = Array(9).fill("");
  currentPlayer = "X";
  running = true;
  statusEl.textContent = `Player ${currentPlayer}'s turn`;
  buildBoard();
});

buildBoard();
