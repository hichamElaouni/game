import React from "react";
import { useNavigate } from "react-router-dom";
import "./rooms.css";
import CustomBtns from "../../../Setings/CustomBtns";
const { REACT_APP_BACKEND_URL, REACT_APP_FORNTEND_PORT } = process.env || {};
const fullUrl = `${REACT_APP_BACKEND_URL}:${REACT_APP_FORNTEND_PORT}`;

export default function Rooms(props) {
  const { room, deleted_Room, NotificationManager, updateToken } = props;
  let navigate = useNavigate();

  return (
    <div className="backGroundRoom">
      <div className="backgroundInfo"></div>

      <div className="infoRoom">
        <a href={"JoinRoom?token=" + room.token}>Go To Room</a>
      </div>
      <CustomBtns
        deleteRoom={deleted_Room}
        updateToken={updateToken}
        idRoom={room.id}
        linkRoom={fullUrl + "/JoinRoom?token=" + room.token}
        NotificationManager={NotificationManager}
        stateBts={false}
      />
    </div>
  );
}
