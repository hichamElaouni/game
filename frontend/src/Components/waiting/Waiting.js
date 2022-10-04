import React, { useEffect } from "react";

import "./waiting.css";
import CircularIndeterminate from "./CircularIndeterminate";
import { useNavigate } from "react-router-dom";

export default function Waiting(props) {
  const { namePlayer, State, Message, token } = props;
  let navigate = useNavigate();

  const navigated = () => {
    window.onbeforeunload = function () {
      localStorage.clear();
    };
    navigate(`/JoinRoom/?token=${token}`);
  };

  return (
    <div className="players ">
      <h1>{namePlayer}</h1>
      <div className={`boardquetion flexboardquetion ${State && "waitForm"}`}>
        <h1> {Message} </h1>
        {State ? (
          <div className="divWaitForm">
            <button className="btnReturn" onClick={() => navigated()}>
              Go To Join Room
            </button>
          </div>
        ) : (
          <CircularIndeterminate />
        )}
      </div>
    </div>
  );
}
