import React, { Fragment, useEffect, useState } from "react";
import Room from "./Room";
import CustumCombobox from "../../../Setings/CustumCombobox";
import { getAllRooms, deleteRoom, updateRoom } from "../../../service/api";
import IconButton from "@material-ui/core/IconButton";
import Add from "@material-ui/icons/Add";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
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
  };

  useEffect(() => {
    getRooms(setRooms);
  }, [token]);

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
          <CustumCombobox title="Games" data={games} />
          <CustumCombobox title="Points" data={Points} />
          <CustumCombobox title="Search" data={room} />
        </div>
        <div className="ListRooms">
          {rooms.map((room, index) => (
            <Fragment key={index}>
              <div className="Room">
                <h2 className="nameRoom">{room.nameRoom}</h2>
                <Room
                  room={room}
                  deleted_Room={deleted_Room}
                  updateToken={updateToken}
                  NotificationManager={NotificationManager}
                />
              </div>
            </Fragment>
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
      <NotificationContainer />

      {adding ? (
        <div className="div-Add-Room">
          <FormAddRoom
            setAdding={setAdding}
            setTitlePage={setTitlePage}
            Data={games}
            NotificationManager={NotificationManager}
            token={token}
            setToken={setToken}
          />
        </div>
      ) : (
        console.log("")
      )}
    </>
  );
}

const Points = [{ id: 1, name: 2 }];
const room = [{ id: 5, name: "All" }];
let games = [{ id: 1, name: "Tic tac toe" }];
