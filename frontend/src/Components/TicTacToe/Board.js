import React from "react";

import { Box } from "./Box";

export const Board = ({ board, onClick, currentClass }) => {
  const turn = currentClass ? "x" : "circle";

  return (
    <div className={`board ${turn} `}>
      {board.map((value, idx) => {
        return (
          <Box
            key={idx}
            value={value}
            onClick={() => value === null && onClick(idx)}
          />
        );
      })}
    </div>
  );
};
