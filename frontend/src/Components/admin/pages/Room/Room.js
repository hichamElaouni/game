import React from "react";
import { useNavigate } from "react-router-dom";
import "./rooms.css";
import CustomBtns from "../../../Setings/CustomBtns";

export default function Rooms(props) {
  const { room, deleted_Room, NotificationManager } = props;
  let navigate = useNavigate();
  const url = "http://localhost:3000/";
  return (
    <div className="room rom">
      <div className="backgroundInfo"></div>

      <div className="infoRoom">
        <a href={"JoinRoom?token=" + room.token}>Go To Room</a>
      </div>
      <CustomBtns
        deleteRoom={deleted_Room}
        idRoom={room.id}
        linkRoom={url + "JoinRoom?token=" + room.token}
        NotificationManager={NotificationManager}
      />
    </div>
  );
}
