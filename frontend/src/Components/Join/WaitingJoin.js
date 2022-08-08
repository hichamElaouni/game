import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getRoomByToken } from "../service/api";

import Waiting from "../waiting/Waiting";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

import { socket } from "../service/socket";
import "./join.css";

export default function WaitingJoin() {
  let navigate = useNavigate();
  const [namePlayer, setNamePlayer] = useState();

  const [stateRoom, setStateRoom] = useState(false);
  const [room, setRoom] = useState({
    id: "",
    nameRoom: "",
    point: "",
    token: "",
    idGame: "",
    createdAt: "",
    updatedAt: "",
  });

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const getRoom = async (token) => {
    const {
      data: { data, success },
    } = await getRoomByToken(token);
    if (!success) {
      console.log("error data");
    } else {
      setRoom(data);
    }
  };

  useEffect(() => {
    getRoom(token, setRoom);

    socket.on("playing", () => {
      navigate(
        "/game?NamePlayer=" +namePlayer 
      );
    });

    socket.on("RoomNotAvailable", () => {
      navigate("/RoomNotAvailable");
    });
  }, [token, socket, namePlayer]);

  if (!room.token) {
    navigate("/RoomNotAvailable");
  }

  socket.on("newPlayer", () => {
    setStateRoom(true);
  });

  socket.on("connected_Room", () => {
    navigate("/game");
  });

  const Join_room = () => {
    if (namePlayer !== "") {
      socket.emit("joinRoom", { namePlayer, token });
      setStateRoom(true);
    } else {
      NotificationManager.warning(
        "Warning message",
        "enter your name firse",
        2000
      );
    }
  };

  return (
    <>
      <div className="join">
        <section className="glass">
          <h1>entrer Your Name</h1>
          <div className="div-inputs">
            <input
              type="text"
              placeholder="entrer your Name ..."
              onChange={(e) => {
                setNamePlayer(e.target.value);
              }}
            />
            <button className="btn" onClick={Join_room}>
              Join Room
            </button>
          </div>
        </section>
      </div>
      <div className="circle1"></div>
      <div className="circle2"></div>

      <div className={`div-wait  ${stateRoom ? "active" : ""}`}>
        <Waiting
          namePlayer={namePlayer}
          text="Wait to anothor Player to Join "
        />
      </div>
      <NotificationContainer />
    </>
  );
}
