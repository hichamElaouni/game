import React, { useState, useEffect } from "react";

export default function Timer(props) {
  const {
    setTimer,
    setTurn,
    setVisible,
    idPlayer,
    scores,
    setScores,
    point,
    checkAnswer,
    setOccurence,
  } = props;
  const [currentCount, setCount] = useState(1000);
  const timer = () => setCount(currentCount - 1);
  if (!currentCount) {
    setOccurence((prevCheck) => (prevCheck += 1));

    setTimer(false);
    setTurn(false);
    setVisible(true);

    if (checkAnswer) {
      if (idPlayer == 1) {
        let { xScore } = scores;
        xScore += point;
        setScores({ ...scores, xScore });
      } else if (idPlayer == 2) {
        let { oScore } = scores;
        oScore += point;
        setScores({ ...scores, oScore });
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
