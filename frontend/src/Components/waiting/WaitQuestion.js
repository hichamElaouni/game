import React from "react";
import "./style.css";
import CircularIndeterminate from "./CircularIndeterminate";

export default function WaitQuestion({ namePlayer }) {
  return (
    <div className="players ">
      <h1>{namePlayer}</h1>
      <div className="boardquetion flexboardquetion ">
        
        <h1> Waiting </h1>
        <CircularIndeterminate />
      </div>
    </div>
  );
}
