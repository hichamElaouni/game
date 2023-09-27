import React from "react";

import "./rooms.css";
import CustomBtns from "../../Setings/CustomBtns";
const { REACT_APP_BACKEND_URL, REACT_APP_FORNTEND_PORT } = process.env || {};
const fullUrl = `${REACT_APP_BACKEND_URL}:${REACT_APP_FORNTEND_PORT}`;

export default function Rooms(props) {
  const {
    room,
    img,
    info,
    link,

    onclick,

    deleted_Room,
    NotificationManager,
    updateToken,
    dashboard,
  } = props;

  return (
    <div className="Room" id={room.id} onClick={(event) => onclick(event)}>
      <h2 className="nameRoom">
        {room.nameRoom} with {room.coin} Coins
      </h2>
      <img src={img} />

      {info && (
        <div className="infoRoom">
          <a href={link}>{info}</a>
        </div>
      )}

      <CustomBtns
        id={room.id}
        deleteData={deleted_Room}
        updateData={updateToken}
        linkRoom={fullUrl + "/" + link}
        NotificationManager={NotificationManager}
        stateBts={false}
        dashboard={dashboard}
      />
    </div>
  );
}
