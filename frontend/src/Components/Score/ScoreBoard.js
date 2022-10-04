import React from "react";
import "./scoreBoard.css";

export const ScoreBoard = (props) => {
  const { xPlaying, studentsPlay, scores } = props;

  return (
    <div className="scoreboard">
      <span className={`score x-score ${!xPlaying && "inactive"}`}>
        Score: {studentsPlay[0].fullName} is : {scores.current.xScore} /
        {scores.current.xGameScore}
      </span>
      <span className={`score o-score ${xPlaying && "inactive"}`}>
        Score: {studentsPlay[1].fullName} is : {scores.current.oScore}/
        {scores.current.oGameScore}
      </span>
    </div>
  );
};
