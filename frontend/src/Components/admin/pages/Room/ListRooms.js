import React, { Fragment, useEffect, useState } from "react";
import Room from "./Room";
import CustumCombobox from "../../../Setings/CustumCombobox";
import { getAllRooms, deleteRoom, addRoom } from "../../../service/api";
import IconButton from "@material-ui/core/IconButton";
import Add from "@material-ui/icons/Add";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const deleted_Room = async (event) => {
  const RoomId = event.currentTarget.id;
  console.log("RoomId==> ", RoomId);
  NotificationManager.info(
    " succufully  deleted ",
    "info",
    3000,
    await deleteRoom(RoomId)
  );
  await deleteRoom(RoomId);
};

export default function ListRooms() {
  const [rooms, setRooms] = useState([]);
  const [adding, setAdding] = useState(false);
  const [titlePage, setTitlePage] = useState("Rooms");
  const getRooms = async (setRooms) => {
    const {
      data: { data, success },
    } = await getAllRooms();
    if (!success) console.log("error data");
    else setRooms(data);
  };

  useEffect(() => {
    getRooms(setRooms);
  }, []);

  const add_Room = async () => {
    setAdding(true);
    setTitlePage("Add Room");

    //await addRoom(DataRoom)
  };
  return (
    <>
      <div className="listRooms">
        <h1 style={{ fontSize: "2.4em" }}>{titlePage}</h1>
        <div className="filterRooms ">
          <CustumCombobox title="Games" data={games} />
          <CustumCombobox title="Points" data={Points} />
          <CustumCombobox title="Search" style={{ with: "15%" }} data={room} />
        </div>
        <div className="Rooms">
          {rooms.map((room, index) => (
            <Fragment key={index}>
              <div className="tr">
                <h2 className="nameRoom">{room.nameRoom}</h2>
                <Room room={room} deleted_Room={deleted_Room} />
              </div>
            </Fragment>
          ))}
        </div>
        <div className="btnAdd">
          <IconButton
            aria-label="Add"
            style={{
              color: "rgb(25, 74, 93)",
              background: "rgba(58, 239, 51, 0.87)",
            }}
          >
            <Add onClick={add_Room} />
          </IconButton>
        </div>
      </div>
      <NotificationContainer />
      <div className={`div-Add-Room ${adding ? "adding" : ""}`}>
        <CustumCombobox />
      </div>
    </>
  );
}

const games = ["Tic Tac Toe", "Chess", "Dama"];
const Points = ["1=>3", "3=>5", "5=>7"];
const room = ["1=>3", "3=>5", "5=>7"];
