import React from "react";

import "./rooms.css";
import CustomBtns from "../../Setings/CustomBtns";
const { REACT_APP_BACKEND_URL, REACT_APP_FORNTEND_PORT } = process.env || {};
const fullUrl = `${REACT_APP_BACKEND_URL}:${REACT_APP_FORNTEND_PORT}`;

export default function Rooms(props) {
  const { room, deleted_Room, NotificationManager, updateToken, link, dashboard } = props;


  return (
    <div className="backGroundRoom">

      <div className="infoRoom">
        <a href={link}>Go To Room</a>
      </div>
      <CustomBtns
        deleteData={deleted_Room}
        updateData={updateToken}
        id={room.id}
        linkRoom={fullUrl + "/" + link}
        NotificationManager={NotificationManager}
        stateBts={false}
        dashboard={dashboard}
      />
    </div>
  );
}
