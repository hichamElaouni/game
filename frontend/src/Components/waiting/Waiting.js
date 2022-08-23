import React from "react";
import "./waiting.css";
import CircularIndeterminate from "./CircularIndeterminate";
import { useNavigate } from "react-router-dom";
export default function Waiting(props) {
  let navigate = useNavigate();
  const { namePlayer, text, waitState } = props;

  return (
    <div className="players ">
      <h1>{namePlayer}</h1>
      <div
        className={`boardquetion flexboardquetion ${
          waitState ? "waitForm" : ""
        }`}
      >
        <h1> {text} </h1>
        {waitState ? (
          <div className="divWaitForm">
            <button className="btnReturn" onClick={() => navigate(-1)}>
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
