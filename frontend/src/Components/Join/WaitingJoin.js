import React, { useState, useEffect, useRef } from "react";
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
import { BsInfoCircle } from "react-icons/bs";

export default function WaitingJoin() {
  let navigate = useNavigate();
  const [typeInputPassword, setTypeInputPassword] = useState(false);
  const [alert, setAlert] = useState({ state: false, message: "" });

  const email = useRef("")
  const password = useRef("")

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
  const tokenParams = searchParams.get("token");

  useEffect(() => {
    getRoom(tokenParams, setRoom);
  }, []);

  const getRoom = async (token, setRoom) => {
    const {
      data: { data, success },
    } = await getRoomByToken(token);
    if (!success) {
      console.log("error data");
    } else {
      setRoom(data);
    }
  };


  if (!room.token) {
    navigate("/RoomNotAvailable");
  }
  socket.on("RoomNotAvailable", () => {
    navigate("/RoomNotAvailable");
  });

  socket.on("Startplaying", (indexPlayer, student) => {
    localStorage.setItem("dataStudent", JSON.stringify({ indexPlayer, student, room }))
    navigate(
      "/game?&token=" +
      tokenParams
    );
  });

  console.log("dd");
  const Join_room = async () => {
    if (email.current !== undefined) {

      const { data: { data, success, message } } = await getStudentByEmail(email.current.value, password.current.value)
      if (!success) {
        setAlert({ state: true, message: message });
      }
      else {
        const student = data;
        socket.emit("joinRoom", { tokenParams, student });
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
          {alert.state ?
            <div className="alert">

              <BsInfoCircle />
              <h2>{alert.message}</h2>
            </div> :
            <br />
          }
          <h1>Singin To Join Room</h1>
          <div className="div-inputs-join">
            <div className="FildEmail">
              <label htmlFor="email">Entre Your Email </label>
              <input
                className="inputs-join"
                type="email"
                ref={email}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                required
                title="Format Email it not currect "
                placeholder="Entre your Email ..."

              />
            </div>


            <div className="FildPassword">
              <label htmlFor="Password">Entre Your Password</label>
              <div className="typeInputpassword">

                <input
                  className="inputs-join"
                  type={typeInputPassword ? "text" : "password"}
                  // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  required
                  // title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters "
                  placeholder="Entre your Password ..."
                  ref={password}
                />
                {typeInputPassword ? <VisibilityOff onClick={() => { setTypeInputPassword(false) }} />
                  : <Visibility onClick={() => { setTypeInputPassword(true) }} />}
              </div>
            </div>

            <button className="btn-join" onClick={() => { Join_room() }}>
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
