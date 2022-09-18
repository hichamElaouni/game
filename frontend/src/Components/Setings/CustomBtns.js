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
    singleStudent,
    setCompAddStudent,
    saveData,
    deleteData,
    updateData,
    cancelData

  } = props;

  return (
    <div className="btnRoom">
      {singleStudent ? (
        readAdd & edit ? (
          <IconButton
            aria-label="Add"
            style={{
              color: "#0f2a35",
              background: "rgba(63, 227, 29, 0.94)",
              height: "100%",
            }}
          >
            <Add
              onClick={() => {
                setCompAddStudent();
              }}
            />
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
            >
              <Save
                onClick={(event) => {
                  saveData(event);
                }}
              />
            </IconButton>
            <IconButton
              aria-label="Cancel"
              style={{
                color: "rgb(224, 93, 69)",
                background: "#e5d0d0ab",
                height: "100%",
              }}
            >
              <Cancel
                onClick={() => {
                  cancelData()
                }}
              />
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
          >
            <Delete
              id={id}
              onClick={(event) => {
                deleteData(event);
              }}
            />
          </IconButton>
          <IconButton
            aria-label="updete"
            style={{
              color: "whitesmoke",
              background: "#4fcd3596",
              height: "100%",
            }}
          >

            <Update
              id={id}
              onClick={(event) => { updateData(event) }}
            />
          </IconButton>
        </Fragment>
      )}

      {stateBts ? (
        console.log("btns Students")
      ) : (
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
