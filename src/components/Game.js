import { useState } from "react";
import Board from "./Board";
const Game = () => {
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const updatedHistory = history;
  const current = updatedHistory[stepNumber];
  const winner = CalculateWinner(current.squares);
  const move = updatedHistory.map((step, move) => {
    const desc = move ? `Go to # ${move}` : "Game Start";
    const jumpTo = (step) => {
      setStepNumber(step);
      setXIsNext(step % 2 === 0);
    };
    return (
      <div key={move}>
        <button className="btninfo" onClick={() => jumpTo(move)}>{desc}</button>
      </div>
    );
  });
  let status;
  if (winner) {
    status = `Winner is ${winner}`;
  } else {
    status = `Turn for Player ${xIsNext ? "X" : "O"}`;
  }
  const handleClick = (i) => {
    const latestHistory = history.slice(0, stepNumber + 1);
    const current = latestHistory[latestHistory.length - 1];
    const squares = current.squares.slice();
    const winner = CalculateWinner(squares);
    if (winner || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    setHistory(history.concat({ squares: squares }));
    setXIsNext(!xIsNext);
    setStepNumber(history.length);
  };
  const handleRestart = () => {
    setXIsNext(true);
    setStepNumber(0);
    setHistory([{ squares: Array(9).fill(null) }]);
  };
  return (
    <div className="game">
      <div className="game-board">
        <div className="game-status">{status}</div>
        <Board onClick={(i) => handleClick(i)} square={current.squares} />
      </div>
      <div className="game-info">
        <button className="btninfo" onClick={handleRestart}>Restart</button>
        <div>{move}</div>
      </div>
    </div>
  );
};
export default Game;

const CalculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};
