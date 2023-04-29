import React, { useState } from "react";
import Board from "./Board";

type BoardArray = Array<Array<string | null>>;

const makeComputerMove = (board: BoardArray): [number, number] => {
  const emptyCells: Array<[number, number]> = [];
  board.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (!cell) {
        emptyCells.push([rowIndex, colIndex]);
      }
    });
  });

  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomIndex];
};

const checkWinner = (board: BoardArray): string | null => {
  const lines = [
    // rows
    [board[0][0], board[0][1], board[0][2]],
    [board[1][0], board[1][1], board[1][2]],
    [board[2][0], board[2][1], board[2][2]],
    // cols
    [board[0][0], board[1][0], board[2][0]],
    [board[0][1], board[1][1], board[2][1]],
    [board[0][2], board[1][2], board[2][2]],

    // diagonals
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]],
  ];

  for (const line of lines) {
    if (line[0] && line[0] === line[1] && line[1] === line[2]) {
      return line[0];
    }
  }
  return null;
};

export const TicTacToe = () => {
  const initialBoard = Array.from({ length: 3 }, () =>
    Array.from({ length: 3 }, () => null)
  );
  const [board, setBoard] = useState<BoardArray>(initialBoard);
  const [player, setPlayer] = useState<string>("X");
  const [winner, setWinner] = useState<string | null>(null);
  const [isNoWinner, setIsNoWinner] = useState<boolean>(false);

  const handleOnClick = (row: number, col: number) => {
    if (board[row][col] || winner) return;

    const updatedPlayerBoard = board.map((newRow, rowIndex) =>
      newRow.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? player : cell
      )
    );

    setBoard(updatedPlayerBoard);
    const newWinner = checkWinner(updatedPlayerBoard);
    setWinner(newWinner);
    setPlayer("X");

    const hasNullValue = updatedPlayerBoard.some((row) =>
      row.some((cell) => cell === null)
    );

    if (!winner && !hasNullValue) {
      setIsNoWinner(true);
      return;
    }

    // computer's move
    if (!newWinner) {
      //
      const [computerRow, computerCol] = makeComputerMove(updatedPlayerBoard);
      const updatedComputerBoard = updatedPlayerBoard.map((newRow, rowIndex) =>
        newRow.map((cell, colIndex) =>
          rowIndex === computerRow && colIndex === computerCol ? "O" : cell
        )
      );

      setTimeout(() => {
        setBoard(updatedComputerBoard);
        setWinner(checkWinner(updatedComputerBoard));
      }, 200);
    }
  };
  const restartGame = () => {
    setBoard(initialBoard);
    setPlayer("X");
    setWinner(null);
    setIsNoWinner(false);
  };

  return (
    <>
      <div className="flex gap-5 flex-col w-full h-full justify-center items-center">
        <h1 className="text-2xl font-bold uppercase">Tic-Tac-Teo</h1>
        <Board board={board} handleClick={handleOnClick} />
        {winner && (
          <p className="text-2xl font-bold">
            {winner === "X" ? "You won!" : "You lost!"}
          </p>
        )}
        {!winner && isNoWinner && <p>No winner</p>}
      </div>
      <div className="w-full mt-10 flex justify-center items-center">
        {/* reset */}
        <button
          className="bg-[#333] text-white px-3 py-2 rounded-md"
          onClick={() => restartGame()}
        >
          Start new game
        </button>
      </div>
    </>
  );
};
