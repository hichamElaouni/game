import React, { useEffect } from "react";
import { socket } from "../service/socket";

export default function Timer(props) {
  const {
    setPauseGame,
    setVisible,
    idPlayer,
    scores,
    setScores,
    point,
    checkAnswer,
    setlastId,
    idQuestion,
    countDown,
    setCountDown,
  } = props;
  const timer = () => setCountDown(countDown - 1);
  if (!countDown) {
    setlastId(idQuestion);
    setPauseGame(false);
    setVisible(false);

    if (checkAnswer) {
      if (idPlayer === 1) {
        let { xScore } = scores;
        xScore += point;
        setScores({ ...scores, xScore });
        socket.emit("setxScore", xScore);
      } else if (idPlayer === 2) {
        let { oScore } = scores;
        oScore += point;
        setScores({ ...scores, oScore });
        socket.emit("setoScore", oScore);
      }
    }
  }
  useEffect(() => {
    if (countDown <= 0) {
      return;
    }
    const id = setInterval(timer, 1000);

    return () => clearInterval(id);
  }, [countDown]);
  return (
    <span className="timer" id="timer">
      {countDown} s
    </span>
  );
}
