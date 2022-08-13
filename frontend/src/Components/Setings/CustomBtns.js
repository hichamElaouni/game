import React from "react";

import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/Delete";
import Update from "@material-ui/icons/UpdateSharp";
import Send from "@material-ui/icons/SendRounded";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function CustomBtns(props) {
  const { idRoom, deleteRoom, linkRoom, NotificationManager } = props;
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
        <Delete id={idRoom} onClick={deleteRoom} />
      </IconButton>
      <IconButton
        aria-label="updete"
        style={{
          color: "whitesmoke",
          background: "#4fcd3596",
          height: "100%",
        }}
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
        <CopyToClipboard
          text={linkRoom}
          onCopy={() =>
            NotificationManager.info("link Room it Copied ", "Info", 3000)
          }
        >
          <Send />
        </CopyToClipboard>
      </IconButton>
    </div>
  );
}
