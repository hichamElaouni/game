import React, { useEffect, useState } from "react";

import { Board } from "./Board";
import { socket } from "../service/socket";

const Game = (props) => {
  const {
    xPlaying,
    scores,
    setPauseGame,
    setVisible,
    pointGame,
    turn,
    setTurn,
    roundOver,
    flagGame,
  } = props;
  const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const [board, setBoard] = useState(Array(9).fill(null));
  const [gameOver, setGameOver] = useState(false);
  const [winningShow, setWinningShow] = useState(false);
  const [messageWin, setMessageWin] = useState();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    socket.on("getxScore", (xScore, xGameScore) => {
      scores.current.xScore = xScore;
      xGameScore !== null && (scores.current.xGameScore = xGameScore);
    });

    socket.on("getoScore", (oScore, oGameScore) => {
      scores.current.oScore = oScore;
      oGameScore !== undefined && (scores.current.oGameScore = oGameScore);
    });

    // socketOpen("switch", ({ turn, updatedBoard }) => {
    //   setBoard(updatedBoard);
    //   setTurn(turn);
    //   setCountDown(countDown);
    // });

    // const socketOpen = (socketName, socketFunction) => {
    //   socket.on(socketName, socketFunction);
    // };
    socket.on("getResetGame", () => {
      resetBoard();
    });

    socket.on("switch", ({ turn, updatedBoard }) => {
      setBoard(updatedBoard);
      setTurn(turn);
    });

    socket.on("getwin", (winMessage) => {
      setGameOver(true);
      setWinningShow(true);
      setMessageWin(winMessage);
    });
  }, []);

  const handleBoxClick = (boxIdx) => {
    // Step 1: Update the board
    const updatedBoard = board.map((value, idx) => {
      if (idx === boxIdx) return xPlaying ? "x" : "circle";

      return value;
    });
    setIndex(index + 1);
    setBoard(updatedBoard);
    setPauseGame(true);
    setVisible((prevCheck) => !prevCheck);

    // Step 2: Check if either player has won the game
    const winner = checkWinner(updatedBoard);
    let winMessage = "";
    if (winner) {
      flagGame.current = false;

      if (winner === "circle") {
        winMessage = "Circle win";

        scores.current.oScore += pointGame;
        scores.current.oGameScore += pointGame;

        socket.emit(
          "setoScore",
          scores.current.oScore,
          scores.current.oGameScore
        );
      } else {
        scores.current.xScore += pointGame;
        scores.current.xGameScore += pointGame;

        socket.emit(
          "setxScore",
          scores.current.xScore,
          scores.current.xGameScore
        );
      }
      setMessageWin(winMessage);
      socket.emit("setwin", winMessage);
      setWinningShow(true);
    }
    setTurn(!turn);

    socket.emit("switch_turn", { turn, updatedBoard });

    roundOver();

    if (index === 4) {
      let { oGameScore, xGameScore } = scores;

      scores.current.oScore += pointGame / 2;
      scores.current.xScore += pointGame / 2;

      socket.emit("setoScore", scores.current.oGameScore);
      socket.emit("setxScore", scores.current.xGameScore);

      socket.emit("setResetGame");
      resetBoard();
    }

    // Step 3: Change active player
    // setXPlaying(!xPlaying);
  };

  const checkWinner = (board) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const [x, y, z] = WIN_CONDITIONS[i];

      // Iterate through win conditions and check if either player satisfies them
      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        setGameOver(true);

        return board[x];
      }
    }
  };

  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null));
    setWinningShow(false);
    setIndex(0);
    flagGame.current = true;
    roundOver();
  };
  return (
    <>
      <div className="game">
        <Board
          board={board}
          currentClass={xPlaying}
          onClick={gameOver ? resetBoard : handleBoxClick}
        />
      </div>

      <div className={`winning-message ${winningShow ? "winningShow" : ""} `}>
        <div style={{ marginTop: "10%" }}>{messageWin}</div>
        {/* <ResetButton resetBoard={resetBoard} /> */}
        <button onClick={resetBoard}>Reset</button>
      </div>
    </>
  );
};

export default Game;
