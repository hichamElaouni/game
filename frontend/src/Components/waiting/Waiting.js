import React from "react";

import "./waiting.css";
import CircularIndeterminate from "./CircularIndeterminate";

export default function Waiting(props) {
  const { namePlayer, State, Message, quitGame } = props;

  return (
    <div className="players ">
      <h1>{namePlayer}</h1>
      <div className={`boardquetion flexboardquetion ${State && "waitForm"}`}>
        <h1> {Message} </h1>
        {State ? (
          <div className="divWaitForm">
            <button className="btnReturn" onClick={() => quitGame()}>
              Go To Join Room
            </button>
          </div>
        ) : (
          <>
            <CircularIndeterminate />

          </>
        )}
      </div>
    </div>
  );
}
