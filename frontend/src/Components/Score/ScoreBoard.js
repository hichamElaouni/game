import React from "react";

import "./scoreBoard.css";

export const ScoreBoard = ({ scores, xPlaying, namePlayer }) => {
  const { xScore, oScore } = scores;
  let player = ";";
  if (namePlayer === undefined) {
  } else {
    player = namePlayer.toString().split(";");
  }
  return (
    <div className="scoreboard">
      <span className={`score x-score ${!xPlaying && "inactive"}`}>
        Turn {player[0]} is : {xScore}
      </span>
      <span className={`score o-score ${xPlaying && "inactive"}`}>
        Turn {player[1]} is : {oScore}
      </span>
    </div>
  );
};
