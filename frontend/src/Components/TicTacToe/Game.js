import React, { useState } from "react";

import { Board } from "./Board";
import { socket } from "../service/socket";

const Game = (props) => {
  const {
    xPlaying = true,
    scores,
    setScores,
    setPauseGame,
    setVisible,
    pointGame,
    turn,
    setTurn,
    over,
    idPlayer,
    countDown,
    setCountDown,
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

  socket.on("getScore", (scores) => {
    setScores(scores);
  });

  socket.on("getxScore", async (xScore) => {
    await setScores({ ...scores, xScore });
  });

  socket.on("getoScore", (oScore) => {
    setScores({ ...scores, oScore });
  });
  socket.on("getResetGame", () => {
    resetBoard();
  });

  socket.on("switch", ({ turn, updatedBoard }) => {
    setBoard(updatedBoard);
    setTurn(turn);

    setCountDown(countDown);
  });

  socket.on("getwin", (winMessage) => {
    setGameOver(true);
    setWinningShow(true);
    setMessageWin(winMessage);
  });

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
      if (winner === "circle") {
        let { oScore } = scores;
        oScore += pointGame;
        winMessage = "Circle win";
        setScores({ ...scores, oScore });
        socket.emit("setoScore", oScore);
      } else {
        let { xScore } = scores;
        xScore += pointGame;
        winMessage = "X win";

        setScores({ ...scores, xScore });
        socket.emit("setxScore", xScore);
      }
      setMessageWin(winMessage);
      socket.emit("setwin", winMessage);
      setWinningShow(true);
    }

    setTurn(!turn);

    console.log("** index ** ", index);

    socket.emit("switch_turn", { turn, updatedBoard });
    let { oScore } = scores;
    let { xScore } = scores;
    let MsgOver;
    if (oScore < xScore) {
      MsgOver =
        "Game over, X win the Game with Total Points =  " +
        xScore +
        " Vs O Points" +
        oScore;
    } else if (oScore > xScore) {
      MsgOver =
        "Game over, O win the Game with Total Points =  " +
        oScore +
        " Vs X Points =  " +
        xScore;
    } else {
      MsgOver = "Game Is Over No One Wins, Score Players = " + oScore;
    }

    if (index === 4) {
      socket.emit("setResetGame");
      resetBoard();
    }

    over
      ? idPlayer * 1 === 1
        ? socket.emit("setGameOver")
        : socket.emit("setOver", MsgOver)
      : console.log("Game Still Play");
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
