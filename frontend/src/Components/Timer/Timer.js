import React, { useState, useEffect } from "react";
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
    setOccurence,
    idQuestion,
  } = props;
  const [currentCount, setCount] = useState(30);
  const timer = () => setCount(currentCount - 1);
  if (!currentCount) {
    setOccurence(idQuestion);
    setPauseGame(false);
    setVisible(false);

    if (checkAnswer) {
      if (idPlayer == 1) {
        let { xScore } = scores;
        xScore += point;
        setScores({ ...scores, xScore });
        socket.emit("setxScore", xScore);
      } else if (idPlayer == 2) {
        let { oScore } = scores;
        oScore += point;
        setScores({ ...scores, oScore });
        socket.emit("setoScore", oScore);
      }
    }
  }
  useEffect(() => {
    if (currentCount <= 0) {
      return;
    }
    const id = setInterval(timer, 1000);

    return () => clearInterval(id);
  }, [currentCount]);
  return (
    <span className="timer" id="timer">
      {currentCount} s
    </span>
  );
}
