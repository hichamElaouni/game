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

export default function Join() {
  let navigate = useNavigate();
  const [typeInputPassword, setTypeInputPassword] = useState(false);
  const [alert, setAlert] = useState({ state: false, message: "" });

  const email = useRef();
  const password = useRef("");

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
    email.current.focus();
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

  socket.on("RoomNotAvailable", (page) => {
    navigate("/" + page);
  });

  socket.on("Startplaying", (indexPlayer, user) => {
    localStorage.setItem(
      "dataUser",
      JSON.stringify({ indexPlayer, user, room })
    );
    navigate("/game?&token=" + tokenParams);
  });

  const Join_room = async () => {
    if (email.current.value !== "") {
      if (email.current.value.match("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$")) {
        if (
          password.current.value.match(
            "(?=^.{8,}$)((?=.*[0-9])|(?=.*/W+))(?![./n])(?=.*[A-Z])(?=.*[a-z]).*$"
          )
        ) {

          console.log("vbn,;");
          const {
            data: { data, success, message },
          } = await getStudentByEmail(email.current.value, password.current.value);
          if (!success) {
            setAlert({ state: true, message: message });
          } else {
            const user = data;
            socket.emit("joinRoom", tokenParams, user);
          }
        } else {
          NotificationManager.warning(
            "Warning message",
            "Password Not Correct",
            2000
          );
        }
      } else {
        NotificationManager.warning(
          "Warning message",
          "Email Not Correct",
          2000
        );
      }
    } else {
      NotificationManager.warning(
        "Warning message",
        "enter your Email firse",
        2000
      );
    }
  };

  return (
    <>
      <div className="join">
        <section className="glass">
          {alert.state ? (
            <div className="alert">
              <BsInfoCircle />
              <h2>{alert.message}</h2>
            </div>
          ) : (
            <br />
          )}
          <h1>Singin To Join Room</h1>
          <div className="div-inputs-join">
            <div className="FildEmail">
              <label>Entre Your Email </label>
              <input
                className="inputs-join"
                type="email"
                ref={email}
                placeholder="Entre your Email ..."
              />
            </div>
            <div className="FildPassword">
              <label>Entre Your Password</label>
              <div className="typeInputpassword">
                <input
                  className="inputs-join"
                  type={typeInputPassword ? "text" : "password"}
                  placeholder="Entre your Password ..."
                  ref={password}
                />
                {typeInputPassword ? (
                  <VisibilityOff
                    onClick={() => {
                      setTypeInputPassword(false);
                    }}
                  />
                ) : (
                  <Visibility
                    onClick={() => {
                      setTypeInputPassword(true);
                    }}
                  />
                )}
              </div>
            </div>

            <button
              className="btn-join"
              onClick={() => {
                Join_room();
              }}
            >
              Join Room
            </button>
          </div>
          {/* <SignIn /> */}
        </section>
      </div>
      <div className="circle1"></div>
      <div className="circle2"></div>


    </>
  );
}
