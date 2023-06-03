import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getRoomByToken, getStudentByEmail } from "../service/api";
import {
  NotificationManager,
} from "react-notifications";
import { PasswordCheck, EmailCheck } from "../Setings/Controllers"

import { socket } from "../service/socket";
import "./join.css";
import { BsInfoCircle } from "react-icons/bs";
import FildCustem from "../Setings/FildCustem";
import FormLogin from '../Setings/FormLogin';



export default function Join() {
  let navigate = useNavigate();
  const [alert, setAlert] = useState({ state: false, message: "" });
  const [singIn, setSingIn] = useState(false);


  const Email = useRef();
  const Password = useRef();
  const Confirm = useRef();
  const First = useRef();
  const Last = useRef();

  const [room, setRoom] = useState({});

  const [searchParams] = useSearchParams();
  const tokenParams = searchParams.get("token");


  useEffect(() => {
    getRoom(tokenParams);
    Email.current.focus();
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
    if (Email.current.value !== "") {
      if (EmailCheck(Email.current.value)) {
        if (
          PasswordCheck(Password.current.value)
        ) {
          const {
            data: { data, success, message },
          } = await getStudentByEmail(Email.current.value, Password.current.value);
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


  const styleFild = {
    borderRadius: " 25px",
    background: "linear-gradient(to right bottom, #ececec,#c4e8e0,#8de6e5)",
    border: "1px solid #10495a59",
    color: "#052a35",
  }
  const CustStyle = {
    background: " #147171",
    color: "white",
    border: "1px solid #e1f8f6b8"
  }

  const StyleForm = {
    width: "90%",
    gap: "4rem",
    padding: "4rem 0"
  }

  return (
    <>
      <div className="join">
        <section className="glass">
          <FormLogin btnFirst="Join Room" btnSecond="Create Account"
            messageError={alert}
            CustStyle={CustStyle}
            StyleForm={StyleForm}
            setMessageError={setAlert}
            StartedFunction={Join_room}
            styleFild={styleFild}
            refs={{ Email, Password, Confirm, Last, First }}
          />

        </section>
      </div>
      <div className="circle1"></div>
      <div className="circle2"></div>
    </>
  );
}
