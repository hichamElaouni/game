import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./scoreBoard.css";

const { REACT_APP_BACKEND_URL, REACT_APP_BACKEND_PORT } = process.env || {};
const fullUrl = `${REACT_APP_BACKEND_URL}:${REACT_APP_BACKEND_PORT}`;

const socket = io.connect(fullUrl);

export const ScoreBoard = ({ scores, xPlaying, namePlayer }) => {
  const { xScore, oScore } = scores;
  const [secondPlayer, setSecondPlayer] = useState("");

  console.log(xPlaying);

  socket.emit("setPlayer", namePlayer);

  useEffect(() => {
    socket.on("getPlayer", (namePlayer) => {
      setSecondPlayer(namePlayer);
    });
  }, [socket]);

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
