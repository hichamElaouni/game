import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getRoomByToken, getStudentByEmail } from "../service/api";
import {
  NotificationManager,
} from "react-notifications";
import { passwordCheck, emailCheck } from "../Setings/Controllers"

import { socket } from "../service/socket";
import "./join.css";
import { BsInfoCircle } from "react-icons/bs";
import FildCustem from "../Setings/FildCustem";
import Email from '@mui/icons-material/ContactMail';

import Login from "../admin/Auth/Login"

export default function Join() {
  let navigate = useNavigate();
  const [alert, setAlert] = useState({ state: false, message: "" });
  const [singIn, setSingIn] = useState(true);
  const email = useRef();
  const password = useRef("");

  const [room, setRoom] = useState({});

  const [searchParams] = useSearchParams();
  const tokenParams = searchParams.get("token");



  useEffect(() => {
    getRoom(tokenParams);
    email.current.focus();
  }, []);

  const getRoom = async (token) => {
    const {
      data: { data, success },
    } = await getRoomByToken(token);
    if (!success) {
      console.log("error data");
    } else {
      if (!data.token) {
        navigate("/RoomNotAvailable");
      }
      else {
        setRoom(data);
      }
    }
  };



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
      if (emailCheck(email.current.value)) {
        if (
          passwordCheck(password.current.value)
        ) {
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


  const Style = {
    borderRadius: "15px",
    background: "linear-gradient( to right bottom, rgba(255, 255, 255, 0.7), rgba(191, 240, 240, 0.3) )"
  }

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


          <div className="divJoin">

            <FildCustem refFild={email} Icon={<Email />} type="text" placeholder="Email" Style={Style} />
            <FildCustem refFild={password} type="password" placeholder="Password" Style={Style} />


            <button
              className="btn-join"
              onClick={() => {
                Join_room();
              }}
            >
              Join Room
            </button>
            <button
              className="btn-join"
              onClick={() => setSingIn(true)}
            >
              Sing in
            </button>
          </div>
          {/* <SignIn /> */}
        </section>
      </div>
      <div className="circle1"></div>
      <div className="circle2"></div>
      {singIn && <div className="login-join">
        <Login />
      </div>}

    </>
  );
}
