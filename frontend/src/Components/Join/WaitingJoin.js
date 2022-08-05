import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from "react-router-dom";
import { getRoomByToken } from "../service/api";



import Waiting from "../waiting/Waiting"
import Menu from "../Menu/Menu";

import { socket } from '../service/socket';
import "./join.css"




export default function WaitingJoin() {
    let navigate = useNavigate();
    const [namePlayer, setNamePlayer] = useState();
    const [stateRoom, setStateRoom] = useState(false);
    const [room, setRoom] = useState({ "id": '', "nameRoom": "", "point": "", "token": "", "idGame": "", "createdAt": "", "updatedAt": "" });
    const [wait, setWait] = useState(false);



    const [searchParams] = useSearchParams();
    const token = (searchParams.get('token'));

    const getRoom = async (token) => {
        const {
            data: { data, success },
        } = await getRoomByToken(token);
        if (!success) {
            console.log("error data");
        }
        else {
            setRoom(data);
        }
    };

    useEffect(() => {
        getRoom(token, setRoom);
        socket.on("RoomNotAvailable", () => {
            navigate("/RoomNotAvailable");
        })
    }, [token, socket]);

    if (!room.token) {
        navigate("/RoomNotAvailable");
    }



    socket.on("newPlayer", () => {
        setStateRoom(true)
    })


    socket.on("connected_Room", () => {
        navigate("/game");
    })

    const Join_room = () => {
        if (stateRoom) {
            navigate("/game");
        } else {
            socket.emit("joinRoom", { namePlayer, token })
            setStateRoom(true)
        }

    }

    return (
        <>
            <Menu style={{ justifyContent: "flex-end", background: "#404a46", opacity: "0" }} />

            <div className='join'>
                <div className='div-inputs'>
                    <input type="text" placeholder='entrer your Name ...' onChange={(e) => { setNamePlayer(e.target.value) }} />
                    <button className='btn' onClick={Join_room}>Join Room</button>
                </div>

                <div className='div-wait'>
                    <Waiting namePlayer={namePlayer} text="Wait to anothor Player to Join " />
                </div>

            </div>
        </>
    )
}
