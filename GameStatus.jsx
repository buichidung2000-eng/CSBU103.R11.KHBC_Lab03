function GameStatus({ player, result }) {
  if (result && result.winner) {
    return (
      <p className="status">
        Player <span className={result.winner === 'X' ? 'mark-x' : 'mark-o'}>{result.winner}</span> wins! 🎉
      </p>
    )
  }
  if (result) {
    return <p className="status">It's a draw!</p>
  }
  return (
    <p className="status">
      Player <span className={player === 'X' ? 'mark-x' : 'mark-o'}>{player}</span>'s turn
    </p>
  )
}

export default GameStatus
