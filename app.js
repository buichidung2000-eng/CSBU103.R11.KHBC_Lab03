// ---------- Constants ----------
// The 8 ways to win, as board positions 0-8:
//  0 1 2
//  3 4 5
//  6 7 8
const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],   // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8],   // columns
  [0, 4, 8], [2, 4, 6],              // diagonals
];

// ---------- State ----------
let board = Array(9).fill(null);     // each item: 'X', 'O' or null
let currentPlayer = 'X';
let gameOver = false;
const scores = { X: 0, O: 0, draws: 0 };

// ---------- Elements ----------
const boardEl = document.querySelector('#board');
const statusEl = document.querySelector('#status');
const restartBtn = document.querySelector('#restartBtn');
const scoreXEl = document.querySelector('#scoreX');
const scoreOEl = document.querySelector('#scoreO');
const scoreDrawEl = document.querySelector('#scoreDraw');

// ---------- Setup: create the 9 cells once ----------
for (let i = 0; i < 9; i++) {
  const cell = document.createElement('button');
  cell.type = 'button';
  cell.className = 'cell';
  cell.dataset.index = i;
  boardEl.appendChild(cell);
}
const cells = boardEl.querySelectorAll('.cell');

// ---------- Game logic ----------
function findWinningLine() {
  // returns the winning line like [0,1,2], or undefined
  return WIN_LINES.find(([a, b, c]) =>
    board[a] && board[a] === board[b] && board[a] === board[c]
  );
}

function setStatus(html) {
  statusEl.innerHTML = html;
}

function markHtml(player) {
  return `<span class="mark-${player.toLowerCase()}">${player}</span>`;
}

function updateScoreboard() {
  scoreXEl.querySelector('.value').textContent = scores.X;
  scoreOEl.querySelector('.value').textContent = scores.O;
  scoreDrawEl.querySelector('.value').textContent = scores.draws;
  // highlight whose turn it is
  scoreXEl.classList.toggle('active', !gameOver && currentPlayer === 'X');
  scoreOEl.classList.toggle('active', !gameOver && currentPlayer === 'O');
}

function handleCellClick(index) {
  if (gameOver || board[index]) return;      // ignore clicks after game over / on filled cells

  board[index] = currentPlayer;
  const cell = cells[index];
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());

  const winLine = findWinningLine();

  if (winLine) {
    gameOver = true;
    scores[currentPlayer]++;
    winLine.forEach((i) => cells[i].classList.add('win'));
    setStatus(`Player ${markHtml(currentPlayer)} wins! 🎉`);
  } else if (board.every(Boolean)) {
    gameOver = true;
    scores.draws++;
    setStatus("It's a draw!");
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    setStatus(`Player ${markHtml(currentPlayer)}'s turn`);
  }
  updateScoreboard();
}

function newRound() {
  board = Array(9).fill(null);
  currentPlayer = 'X';
  gameOver = false;
  cells.forEach((cell) => {
    cell.textContent = '';
    cell.className = 'cell';
  });
  setStatus(`Player ${markHtml('X')}'s turn`);
  updateScoreboard();
}

// ---------- Events ----------
boardEl.addEventListener('click', (e) => {
  const cell = e.target.closest('.cell');
  if (!cell) return;
  handleCellClick(Number(cell.dataset.index));
});

restartBtn.addEventListener('click', newRound);

// ---------- Start ----------
newRound();
