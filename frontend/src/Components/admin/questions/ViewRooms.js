import React, { useState, Fragment, useEffect } from "react";

import { getAllRooms } from "../../service/api";

// create function to get All informations about 3 tables(question games room)
const getRooms = async (setRooms) => {
  const {
    data: { data, success },
  } = await getAllRooms();
  if (!success) console.log("error data");
  else setRooms(data);
};

export default function ViewRooms(props) {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getRooms(setRooms);
  }, []);

  return (
    <>
      <div className="ViewRooms">
        {rooms.map((room, key) => (
          <Fragment key={key}>
            <div
              className="view"
              id={room.id}
              onClick={(event) => console.log(event.currentTarget.id)}
            >
              <h3 className="titleRoom">{room.nameRoom}</h3>
              <div className="imgGame">
                <div className="infoGame"></div>
                <p className="DescRoom">
                  Questions
                  <br id="4" />
                  {room.point} point
                </p>
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </>
  );
}
