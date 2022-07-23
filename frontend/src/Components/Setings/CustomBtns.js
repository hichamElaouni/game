import React from "react";

import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/Delete";
import Update from "@material-ui/icons/UpdateSharp";
import Send from "@material-ui/icons/SendRounded";

export default function CustomBtns() {
  return (
    <div className="btnRoom">
      <IconButton
        aria-label="delete"
        style={{
          color: "rgb(224, 93, 69)",
          background: "#e5d0d0ab",
          height: "100%",
        }}
      >
        <Delete />
      </IconButton>
      <IconButton
        aria-label="updete"
        style={{ color: "whitesmoke", background: "#4fcd3596", height: "100%" }}
      >
        <Update />
      </IconButton>
      <IconButton
        aria-label="Send"
        style={{
          color: "rgb(45, 96, 105)",
          background: "rgba(237, 232, 155, 0.67)",
          height: "100%",
        }}
      >
        <Send />
      </IconButton>
    </div>
  );
}
