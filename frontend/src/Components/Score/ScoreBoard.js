import React, { useEffect, useState } from "react";
import "./scoreBoard.css";
import { socket } from "../service/socket";

export const ScoreBoard = (props) => {
  const { studentsPlay, setStudentsPlay, scores, xPlaying, player } = props;
  console.log(
    "🚀 ~ file: ScoreBoard.js ~ line 7 ~ ScoreBoard ~ player",
    player
  );

  const { xScore, oScore } = scores;
  const [secondPlayer, setSecondPlayer] = useState("");

  setStudentsPlay(player);
  socket.emit("setPlayer", player, studentsPlay);

  useEffect(() => {
    socket.on("getPlayer", (player, studentsPlay) => {
      setSecondPlayer(player.name);
      // setStudentsPlay([...studentsPlay, { player }]);
    });
  }, []);

  return (
    <div className="scoreboard">
      <span className={`score x-score ${!xPlaying && "inactive"}`}>
        Turn {xPlaying ? player.name : secondPlayer} is : {xScore}
      </span>
      <span className={`score o-score ${xPlaying && "inactive"}`}>
        Turn {!xPlaying ? player.name : secondPlayer} is : {oScore}
      </span>
    </div>
  );
};
