import { useState } from 'react'
import Scoreboard from './Scoreboard'
import GameStatus from './GameStatus'
import Board from './Board'

const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
]

// Looks at the board and returns the game result, or null if the game is still going
function getResult(board) {
  for (const [a, b, c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] }
    }
  }
  if (board.every(Boolean)) return { winner: null, line: [] }   // draw
  return null
}

function App() {
  // State = data that changes. When it changes, React re-draws the screen.
  const [board, setBoard] = useState(Array(9).fill(null))
  const [player, setPlayer] = useState('X')
  const [scores, setScores] = useState({ x: 0, draws: 0, o: 0 })

  const result = getResult(board)          // calculated from the board, not stored

  function handleCellClick(index) {
    if (board[index] || result) return     // ignore filled cells and clicks after game over

    const nextBoard = [...board]           // copy the array, never edit state directly
    nextBoard[index] = player
    setBoard(nextBoard)

    const nextResult = getResult(nextBoard)
    if (nextResult) {
      setScores((s) =>
        nextResult.winner
          ? { ...s, [nextResult.winner.toLowerCase()]: s[nextResult.winner.toLowerCase()] + 1 }
          : { ...s, draws: s.draws + 1 }
      )
    } else {
      setPlayer(player === 'X' ? 'O' : 'X')
    }
  }

  function handleNewRound() {
    setBoard(Array(9).fill(null))
    setPlayer('X')
  }

  return (
    <main className="game">
      <h1>Tic<span>·</span>Tac<span>·</span>Toe</h1>
      <Scoreboard scores={scores} currentPlayer={result ? null : player} />
      <GameStatus player={player} result={result} />
      <Board cells={board} winLine={result ? result.line : []} onCellClick={handleCellClick} />
      <button type="button" className="restart-btn" onClick={handleNewRound}>↻ New Round</button>
    </main>
  )
}

export default App
