import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getRoomByToken, getStudentByEmail } from "../service/api";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

import { socket } from "../service/socket";
import "./join.css";

export default function WaitingJoin() {
  let navigate = useNavigate();
  const [emailPlayer, setEmailPlayer] = useState();
  const [passwordPlayer, setPasswordPlayer] = useState();
  const [students, setStudents] = useState({});
  const [typePassword, setTypePassword] = useState(true);

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
    socket.on("Startplaying", (id, name) => {
      navigate(
        "/game?&token=" +
        token +
        "&NamePlayer=" +
        name +
        "&PlayerId=" +
        id
      );
    });
    socket.on("RoomNotAvailable", () => {
      navigate("/RoomNotAvailable");
    });
  }, [socket]);

  if (!room.token) {
    navigate("/RoomNotAvailable");
  }

  const Join_room = async () => {
    if (emailPlayer !== undefined) {

      const { data: { data, success } } = await getStudentByEmail({ emailPlayer, passwordPlayer })
      if (!data)
        console.log("🚀 ~ file: WaitingJoin.js ~ line 71 ~ WaitingJoin ~ success", !success)
      else {
        setStudents(data)
        socket.emit("joinRoom", { token, name: data.fullName });
      }
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
          <h1>Singin To Join Room</h1>
          <div className="div-inputs-join">
            <div className="FildEmail">
              <label htmlFor="email">Entre Your Email </label>
              <input
                className="inputs-join"
                type="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                required
                title="Format Email it not currect "
                placeholder="Entre your Email ..."
                onChange={(e) => {
                  setEmailPlayer(e.target.value);
                }}
              />
            </div>


            <div className="FildPassword">
              <label htmlFor="Password">Entre Your Password</label>
              <div className="typepassword">

                <input
                  className="inputs-join"
                  type={typePassword ? "text" : "password"}
                  // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  required
                  // title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters "
                  placeholder="Entre your Password ..."
                  onChange={(e) => {
                    setPasswordPlayer(e.target.value);
                  }}
                />
                {typePassword ? <VisibilityOff onClick={() => { setTypePassword(false) }} /> : <Visibility onClick={() => { setTypePassword(true) }} />}
              </div>
            </div>













            <button className="btn-join" onClick={Join_room}>
              Join Room
            </button>
          </div>
          {/* <SignIn /> */}
        </section>
      </div>
      <div className="circle1"></div>
      <div className="circle2"></div>

      <NotificationContainer />
    </>
  );
}
