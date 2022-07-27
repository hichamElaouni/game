import React, { useEffect, useState } from 'react'
import io from "socket.io-client"
import './message.css'

const { REACT_APP_BACKEND_URL, REACT_APP_BACKEND_PORT } = process.env || {};
const fullUrl = `${REACT_APP_BACKEND_URL}:${REACT_APP_BACKEND_PORT}`;

const socket = io.connect(fullUrl);

export default function Messages() {
  const [idroom, setIdroom] = useState("")
  const [message, setMessage] = useState("")
  const [style, setStyle] = useState("red")

  const join_Room = () => {
    if (idroom !== "") {
      socket.emit("joinRoom", idroom)
    }
  }


  useEffect(() => {
    socket.on("receive", (stats) => {
      setStyle(stats)
    });
  }, [socket]);

  return (
    <div className='boxMassages'>
      <div className='join'>
        <input type="text" placeholder='idroom' onChange={(event) => setIdroom(event.target.value)} />
        <button onClick={join_Room}>Join</button>
      </div>
      <div className='Msg'>
        <div className='messages' style={{ background: style }}>{message}</div>
        <input type="text" placeholder='text' onChange={(event) => setMessage(event.target.value)} />
        <button >send</button>

      </div>
    </div>
  )
}
