import React, { Fragment } from "react";

import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/Delete";
import Update from "@material-ui/icons/UpdateSharp";
import Send from "@material-ui/icons/SendRounded";
import Save from "@material-ui/icons/Save";
import Cancel from "@material-ui/icons/Cancel";
import Add from "@material-ui/icons/Add";

import { CopyToClipboard } from "react-copy-to-clipboard";

export default function CustomBtns(props) {
  const {
    id,
    linkRoom,
    NotificationManager,
    readAdd,
    edit,
    stateBts,
    singleUser,
    setCompAddUser,
    saveData,
    deleteData,
    updateData,
    cancelData,
  } = props;


  return (
    <div className="btnRoom">
      {singleUser ? (
        readAdd & edit ? (
          <IconButton
            aria-label="Add"
            style={{
              color: "#0f2a35",
              background: "rgba(63, 227, 29, 0.94)",
              height: "100%",
            }}
            onClick={() => {
              setCompAddUser();
            }}
          >
            <Add />
          </IconButton>
        ) : (
          <Fragment>
            <IconButton
              aria-label="Save"
              style={{
                height: "100%",
                color: "whitesmoke",
                background: "#4fcd3596",
              }}
              onClick={(event) => {
                saveData(event);
              }}
            >
              <Save />
            </IconButton>
            <IconButton
              aria-label="Cancel"
              style={{
                color: "rgb(224, 93, 69)",
                background: "#e5d0d0ab",
                height: "100%",
              }}
              onClick={() => {
                cancelData();
              }}
            >
              <Cancel />
            </IconButton>
          </Fragment>
        )
      ) : (
        <Fragment>
          <IconButton
            aria-label="delete"
            style={{
              color: "rgb(224, 93, 69)",
              background: "#e5d0d0ab",
              height: "100%",
            }}
            id={id}
            onClick={(event) => {
              deleteData(event);
            }}
          >
            <Delete />
          </IconButton>
          <IconButton
            aria-label="updete"
            style={{
              color: "whitesmoke",
              background: "#4fcd3596",
              height: "100%",
            }}
            id={id}
            onClick={(event) => {
              updateData(event);
            }}
          >
            <Update />
          </IconButton>
        </Fragment>
      )}

      {!stateBts && (
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
      )}
    </div>
  );
}
