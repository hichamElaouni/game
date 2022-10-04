import React, { useState, useEffect } from "react";
import { socket } from "../service/socket";

export default function Timer(props) {
  const {
    setPauseGame,
    idQuestion,
    setVisible,
    indexPlayer,
    point,
    checkAnswer,
    setlastId,
    count,
    idStudent,
    answerSelected,
    addQuestionHistory,
    idHistoryRoom,
    scores,
  } = props;

  const [countDown, setCountDown] = useState(count);

  if (!countDown) {
    setPauseGame(false);
    setVisible(false);

    let questionshistory = {
      idQuestion: idQuestion,
      idStudent: idStudent,
      selectedAnswer: !answerSelected ? 0 : answerSelected,
      idRoomHistory: idHistoryRoom,
    };

    addQuestionHistory(questionshistory);

    if (checkAnswer) {
      if (indexPlayer * 1 === 1) {
        scores.current.xScore += point;
        socket.emit("setxScore", scores.current.xScore);
      } else if (indexPlayer * 1 === 2) {
        scores.current.oScore += point;
        socket.emit("setoScore", scores.current.oScore);
      }
    }
    setlastId(idQuestion);
  }

  useEffect(() => {
    if (countDown <= 0) {
      return;
    }
    const interval = setInterval(() => {
      setCountDown((countDown) => countDown - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [countDown]);

  return (
    <span className="timer" id="timer">
      {countDown} s
    </span>
  );
}
