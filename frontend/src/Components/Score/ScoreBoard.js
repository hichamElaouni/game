import React, { useEffect, useState } from "react";
import "./scoreBoard.css";
import { socket } from "../service/socket";

export const ScoreBoard = ({ scores, xPlaying, namePlayer }) => {
  const { xScore, oScore } = scores;
  console.log("ss ==> ", scores);
  const [secondPlayer, setSecondPlayer] = useState("");

  socket.emit("setPlayer", namePlayer);

  useEffect(() => {
    socket.on("getPlayer", (namePlayer) => {
      setSecondPlayer(namePlayer);
    });
  }, []);

  return (
    <div className="scoreboard">
      <span className={`score x-score ${!xPlaying && "inactive"}`}>
        Turn {xPlaying ? namePlayer : secondPlayer} is : {xScore}
      </span>
      <span className={`score o-score ${xPlaying && "inactive"}`}>
        Turn {!xPlaying ? namePlayer : secondPlayer} is : {oScore}
      </span>
    </div>
  );
};
