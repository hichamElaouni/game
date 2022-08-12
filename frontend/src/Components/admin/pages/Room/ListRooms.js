import React, { Fragment, useEffect, useState } from "react";
import Room from "./Room";
import CustumCombobox from "../../../Setings/CustumCombobox";
import { getAllRooms, deleteRoom, addRoom } from "../../../service/api";
import IconButton from "@material-ui/core/IconButton";
import Add from "@material-ui/icons/Add";
import Combobox from "react-widgets/Combobox";
import NumberPicker from "react-widgets/NumberPicker";
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
    else setRooms(data);
  };

  const deleted_Room = async (event) => {
    const RoomId = event.currentTarget.id;
    console.log("RoomId==> ", RoomId);
    NotificationManager.info(
      " succufully  deleted ",
      "info",
      3000,
      await deleteRoom(RoomId)
    );
    //await deleteRoom(RoomId);
  };

  useEffect(() => {
    getRooms(setRooms);
  }, []);

  const add_Room = () => {
    setAdding(true);
    setTitlePage("Add Room");
    setToken(md5(Math.random().toFixed(4) * 1000).slice(0, 15));

    console.log("Add");
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
      <div className={`div-Add-Room ${adding ? "adding" : ""}`}>
        <FormAddRoom
          setAdding={setAdding}
          setTitlePage={setTitlePage}
          Data={games}
          NotificationManager={NotificationManager}
          token={token}
        />
      </div>
    </>
  );
}

const Points = [{ id: 1, name: 2, id: 2, name: 3 }];
const room = [{ id: 1, name: "All" }];
let games = [{ id: 1, name: "Tic tac toe" }];
