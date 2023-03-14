import React, { Fragment, useEffect, useState } from "react";
import Room from "./Room";
import CustumCombobox from "../../../Setings/CustumCombobox";
import { getAllRooms, deleteRoom, updateRoom } from "../../../service/api";
import IconButton from "@material-ui/core/IconButton";
import Add from "@material-ui/icons/Add";
import { NotificationManager } from "react-notifications";
import FormAddRoom from "./FormAddRoom";
import md5 from "md5";

export default function ListRooms() {
  const [rooms, setRooms] = useState([]);
  const [adding, setAdding] = useState(false);
  const [titlePage, setTitlePage] = useState("Rooms");
  const [token, setToken] = useState("");


  const getRooms = async (setRooms) => {
    const {
      data: { data, success },
    } = await getAllRooms();
    if (!success) console.log("error data");
    else {
      setRooms(data);
    }
  };

  const deleted_Room = async (event) => {
    const RoomId = event.currentTarget.id;

    NotificationManager.success(
      " succufully  deleted ",
      "info",
      3000,
      await deleteRoom(RoomId)
    );
    setToken(123456789);
  };

  const updateToken = async (event) => {
    const RoomId = event.currentTarget.id;

    let token = md5(Math.random().toFixed(4) * 1000).slice(0, 15);
    NotificationManager.success(
      " succufully Updated ",
      "info",
      3000,
      await updateRoom(RoomId, token)
    );
    setToken(token);
  };

  useEffect(() => {
    getRooms(setRooms);
  }, [token]);

  const escPress = (event) => {
    if (event.keyCode === 27) {
      setAdding(false);
    }
  };

  const add_Room = () => {
    setAdding(true);
    setTitlePage("Add Room");
    setToken(md5(Math.random().toFixed(4) * 1000).slice(0, 15));
  };

  return (
    <>
      <div className="listRooms">
        <h1 style={{ fontSize: "2.4em" }}>{titlePage}</h1>
        <div className="filterRooms ">

        </div>
        <div className="ListRooms">
          {rooms.map((room, index) => (

            <div className="Room" key={index}>
              <h2 className="nameRoom">{room.nameRoom} with {room.coin} Coins</h2>
              <Room
                room={room}
                deleted_Room={deleted_Room}
                updateToken={updateToken}
                NotificationManager={NotificationManager}
                link={"JoinRoom?token=" + room.token}
              />
            </div>

          ))}
        </div>
        <div className="btnAdd" onClick={add_Room}>
          <IconButton
            aria-label="Add"
            style={{
              color: "rgb(25, 74, 93)",
              background: "rgba(58, 239, 51, 0.87)",
            }}
          >
            <Add />
          </IconButton>
        </div>
      </div>


      {adding && (
        <div
          className="div-Add-Room"
          tabIndex={0}
          onKeyDown={(event) => {
            escPress(event);
          }}
        >
          <FormAddRoom
            setAdding={setAdding}
            setTitlePage={setTitlePage}
            Data={games}
            NotificationManager={NotificationManager}
            token={token}
            setToken={setToken}
          />
        </div>
      )}
    </>
  );
}


let games = [{ id: 1, name: "Tic tac toe" }];
