import React, { useState, useEffect } from "react";
import { NextQuestion } from "../Setings/Controllers";

export default function Timer(props) {
  const {
    setVisible,
    setlastId,
    lastId,
    setPauseGame,
    checkAnswer,
    indexPlayer,
    point,
    idQuestion,
    answerSelected,
    idUser,
    scores,
    idHistoryRoom,
    AddRoomHistory,
    count,
  } = props;

  const [countDown, setCountDown] = useState(count);

  if (!countDown) {


    NextQuestion(
      setVisible,
      setlastId,
      lastId,
      setPauseGame,
      checkAnswer,
      indexPlayer,
      point,
      idQuestion,
      answerSelected,
      idUser,
      scores,
      idHistoryRoom,
      AddRoomHistory,
    )

  }

  useEffect(() => {
    if (countDown <= 0) {
      return;
    }
    const interval = setInterval(() => {
      setCountDown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="timer" id="timer">
      {countDown} s
    </span>
  );
}
