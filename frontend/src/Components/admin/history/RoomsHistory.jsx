import { useEffect, useState, useRef } from "react";
import { getRoomsHistory } from "../../service/api";
import Pagination from "../../Setings/Pagination";
import { NotificationManager } from "react-notifications";

import Room from "../Room/Room";
import './history.css'

export default function RoomsHistory(props) {

    const { user, getIdHistoryRoom } = props;
    const [rooms, setRooms] = useState([]);

    const refLengthTable = useRef(0);
    const [limit, setLimit] = useState(25);
    const [page, setPage] = useState(1);
    const refEffect = useRef(false);

    const getHistoryRooms = async (limit, page) => {
        const {
            data: { data, success, lengthTable },
        } = await getRoomsHistory(user.id, limit, page);
        if (!success) console.log("error data");
        else {

            let rooms = [];
            data.map((room) => {
                const { Rooms, User, ...rest } = room;
                rooms = [
                    ...rooms,
                    {
                        idUser: User.id,
                        last_name: User.last_name,
                        first_name: User.first_name,
                        nameRoom: Room.nameRoom,
                        img: Rooms?.Game.Image,
                        ...rest,
                    },
                ];
            });
            setRooms(rooms);


            refLengthTable.current = lengthTable / limit;
        }
    };

    useEffect(() => {
        if (refEffect.current) {
            getHistoryRooms(limit, page);
        }
        return () => {
            refEffect.current = true;
        };
    }, [limit, page]);




    return (
        <div className="historyRooms" >
            {
                rooms.map((room) =>
                    <Room
                        key={room.id}
                        room={room}
                        img={room.img}
                        link={"JoinRoom?token=" + room.token}
                        info={"Go to Room"}
                        NotificationManager={NotificationManager}
                        dashboard={true}
                        onclick={getIdHistoryRoom}
                    />
                )}
            <Pagination
                lengthPages={refLengthTable.current}
                setPage={setPage}
                setLimit={setLimit}
            />
        </div>
    );
}
