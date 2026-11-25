function Cell({ value, isWinning, onClick }) {
  const markClass = value === 'X' ? 'x' : value === 'O' ? 'o' : ''
  return (
    <button
      type="button"
      className={`cell ${markClass} ${isWinning ? 'win' : ''}`}
      onClick={onClick}
    >
      {value}
    </button>
  )
}

export default Cell
