import React, { useEffect, useRef, useState } from "react";

import { Board } from "./Board";
import { socket } from "../service/socket";

const TicTacToe = (props) => {
  const {
    xPlaying,
    scores,
    setPauseGame,
    pauseGame,
    setVisible,
    pointGame,
    turn,
    setTurn,
    roundGameOver,
    flagGame,
    getOver,
    count,
    NotificationManager,
    quitGame,
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
  const [roundOver, setRoundOver] = useState(false);
  const [winningShow, setWinningShow] = useState(false);
  const [messageWin, setMessageWin] = useState();
  const index = useRef(0);

  const [countDown, setCountDown] = useState(count);

  useEffect(() => {

    if (countDown === parseInt(count / 2, 10)) {
      const NotifTime = parseInt(count / 6, 10) * 1000;

      NotificationManager.warning(
        "Half the time allotted to play has passed. left for you  " +
        countDown +
        " S ",
        "Warning ",
        NotifTime + 1
      );
      //messag parseInt(  count / 6, 10 )
    }
    if (countDown === parseInt(count / 3, 10)) {
      //messageDesconnected

      NotificationManager.error(
        "If you don't play within " +
        countDown +
        " S , you will be considered forfeited",
        "Warning ",
        5000 + 1
      );
    }

    if (countDown <= 0) {
      window.location.reload(false);
      quitGame();
      return;
    }
    if (!pauseGame) {
      const interval = setInterval(() => {
        setCountDown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [pauseGame, countDown]);


  useEffect(() => {
    socket.on("getxScore", (xScore, xGameScore) => {
      scores.current.xScore = xScore;
      xGameScore !== null && (scores.current.xGameScore = xGameScore);
    });

    socket.on("getoScore", (oScore, oGameScore) => {
      scores.current.oScore = oScore;
      oGameScore !== null && (scores.current.oGameScore = oGameScore);
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
      setRoundOver(true);
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
    setCountDown(count);
    index.current += 1;
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

    if (index.current === 5) {
      scores.current.oScore += pointGame / 2;
      scores.current.xScore += pointGame / 2;

      socket.emit("setoScore", scores.current.oGameScore);
      socket.emit("setxScore", scores.current.xGameScore);

      socket.emit("setResetGame");
      resetBoard();
    }

    // Round over
    getOver.current && roundGameOver();

    // Step 3: Change active player
    // setXPlaying(!xPlaying);
  };

  const checkWinner = (board) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const [x, y, z] = WIN_CONDITIONS[i];

      // Iterate through win conditions and check if either player satisfies them
      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        setRoundOver(true);

        return board[x];
      }
    }
  };

  const resetBoard = () => {
    setRoundOver(false);
    setBoard(Array(9).fill(null));
    setWinningShow(false);
    index.current = 0;
  };
  return (
    <>
      <div className="game">
        <Board
          board={board}
          currentClass={xPlaying}
          onClick={roundOver ? resetBoard : handleBoxClick}
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

export default TicTacToe;
