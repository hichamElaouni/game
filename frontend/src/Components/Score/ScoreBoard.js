import React from "react";
import "./scoreBoard.css";

export const ScoreBoard = (props) => {
  const { xPlaying, usersPlay, scores } = props;

  return (
    <div className="scoreboard">
      <span className={`score x-score ${!xPlaying && "inactive"}`}>
        Score: {usersPlay[0].first_name + " " + usersPlay[0].last_name} is : {scores.current.xScore} /
        {scores.current.xGameScore}
      </span>
      <span className={`score o-score ${xPlaying && "inactive"}`}>
        Score: {usersPlay[1].first_name + " " + usersPlay[1].last_name} is : {scores.current.oScore}/
        {scores.current.oGameScore}
      </span>
    </div>
  );
};
