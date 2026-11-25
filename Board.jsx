import Cell from './Cell'

function Board({ cells, winLine, onCellClick }) {
  return (
    <div className="board">
      {cells.map((value, index) => (
        <Cell
          key={index}
          value={value}
          isWinning={winLine.includes(index)}
          onClick={() => onCellClick(index)}
        />
      ))}
    </div>
  )
}

export default Board
