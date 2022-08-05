import React from "react";
import "./style.css";
import CircularIndeterminate from "./CircularIndeterminate";

export default function Waiting({ namePlayer, text }) {
  return (
    <div className="players ">
      <h1>{namePlayer}</h1>
      <div className="boardquetion flexboardquetion ">
        <h1> {text} </h1>
        <CircularIndeterminate />
      </div>
    </div>
  );
}
