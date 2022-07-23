import React, { useState, useEffect } from "react";

import { Board } from "./Board";

import io from "socket.io-client";

const { REACT_APP_BACKEND_URL, REACT_APP_BACKEND_PORT } = process.env || {};
const fullUrl = `${REACT_APP_BACKEND_URL}:${REACT_APP_BACKEND_PORT}`;

const socket = io.connect(fullUrl);

const Game = (props) => {
  const {
    xPlaying = true,
    setXPlaying,
    scores,
    setScores,
    setTurn,
    setTimer,
    setVisible,
    pointGame,
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

  const [dataSend, setDataSend] = useState();
  const [dataReceive, setDataReceive] = useState();

  socket.emit("joinroom", 1);
  console.log("emit");
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setTimer(true);
      console.log("emit2222");
      xPlaying
        ? setVisible((prevCheck) => !prevCheck)
        : setTurn((prevCheck) => !prevCheck);
    });
  }, [socket]);

  const sendMessage = () => {
    console.log("emit 3333");
    socket.emit("send_message", { roomId: 1, dataSend: "sdgdgdf" });
  };

  const handleBoxClick = (boxIdx) => {
    // Step 1: Update the board
    const updatedBoard = board.map((value, idx) => {
      if (idx === boxIdx) return xPlaying ? "x" : "circle";
      return value;
    });
    //setTurn((prevCheck) => !prevCheck);
    setBoard(updatedBoard);

    // const sendMessage = () => {
    //   socket.emit("send_message", {

    //    });
    // };
    setTimer(true);
    xPlaying
      ? setVisible((prevCheck) => !prevCheck)
      : setTurn((prevCheck) => !prevCheck);
    sendMessage();
    // Step 2: Check if either player has won the game
    const winner = checkWinner(updatedBoard);

    if (winner) {
      if (winner === "circle") {
        let { oScore } = scores;
        oScore += pointGame;
        setMessageWin("Circle win");
        setScores({ ...scores, oScore });
      } else {
        let { xScore } = scores;
        xScore += pointGame;
        setMessageWin("X win");

        setScores({ ...scores, xScore });
      }
      setWinningShow(true);
    }

    // Step 3: Change active player
    setXPlaying(!xPlaying);
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
