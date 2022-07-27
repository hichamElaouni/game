import React, { useState, useEffect } from "react";
import "./rooms.css";
import CustomBtns from "../../../Setings/CustomBtns";
import io from "socket.io-client";

const { REACT_APP_BACKEND_URL, REACT_APP_BACKEND_PORT } = process.env || {};
const fullUrl = `${REACT_APP_BACKEND_URL}:${REACT_APP_BACKEND_PORT}`;

const socket = io.connect(fullUrl);

export default function Rooms(props) {
  const { room } = props;
  const [dataSend, setDataSend] = useState();
  const [dataReceive, setDataReceive] = useState();
  const [roomId, setRoomId] = useState();

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setDataReceive(data.dataSend);
    });
  }, [socket]);

  const sendMessage = () => {
    socket.emit("send_message", { roomId, dataSend });
  };
  const join_Room = () => {
    if (roomId !== "") {
      console.log(roomId);
      socket.emit("joinroom", roomId);
    }
  };
  return (
    <div className="room rom">
      {/* <h1 style={{ fontSize: "2.4em" }}>Rooms</h1>
      <div style={{ display: "grid" }}>
        <input
          type="text"
          placeholder="join .."
          onChange={(event) => {
            setRoomId(event.target.value);
          }}
        />
        <input type="button" value="Room .." onClick={join_Room} />
      </div>
      <div style={{ display: "grid" }}>
        <input
          type="text"
          placeholder="text"
          onChange={(event) => {
            setDataSend(event.target.value);
          }}
        />
        <input type="button" value="send ." onClick={sendMessage} />
      </div>
      <label htmlFor="" id="txtrecerve">
        {dataReceive}
      </label> */}
      <div className="backgroundInfo"></div>

      <div className="infoRoom">
        <p>Information Room</p>
      </div>
      <CustomBtns />
    </div>
  );
}
