import React, { useEffect, useRef, useState } from 'react'

import Room from '../../pages/Room/Room'
import { getCountRooms } from "../../../service/api";
import { NotificationManager } from "react-notifications";

import "./Dashboard.css"

export default function Dashboard() {

  const [rooms, setRooms] = useState([]);

  const [topNumber, setTopNumber] = useState(5);

  const getcountRooms = async (TopRooms) => {
    const {
      data: { data, success },
    } = await getCountRooms(TopRooms);
    if (!success) console.log("error data");
    else {
      let result = [];
      data.map((dt) => {
        let { Room, ...rest } = dt;
        result = [...result, { ...Room, ...rest }]
      })

      setRooms(result);
    }
  };
  useEffect(() => {
    getcountRooms(topNumber);
  }, [topNumber]);

  const topRooms = (event) => {
    setTopNumber(event.target.value);

  }

  return (
    <>
      {/* <div className='formLogin'>
          <Login setAuth={setAuth} setUser={setUser} user={user} />
        </div>  */}
      <div className='dashboard'>
        <h1>Most <select className="selectPagination" onChange={(event) => { topRooms(event) }}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select> rooms entered</h1>
        <div className="ListRooms">
          {rooms.map((room, index) => (

            <div className="Room" key={index}>
              <h2 className="nameRoom">{room.nameRoom} ({room.countRoom})</h2>
              <Room
                NotificationManager={NotificationManager}
                room={room}
                link={"JoinRoom?token=" + room.token}
                dashboard={true}
              />
            </div>

          ))}
        </div>
      </div>

    </>
  )
}

