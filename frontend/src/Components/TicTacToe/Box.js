import React from "react";

export const Box = ({ value, onClick }) => {
  return <div className={`cell ${value}`} onClick={onClick}></div>;
};
