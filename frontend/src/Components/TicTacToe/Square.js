import React from "react";

export default function Square(props) {
  return (
    <div className={`cell ${props.classCell}`} onClick={props.onClick}></div>
  );
}
