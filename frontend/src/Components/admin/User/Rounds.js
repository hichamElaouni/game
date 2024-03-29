import React from "react";

export default function Rounds(props) {
    const { Room, setUser, getHistoryQuestions } = props;
    return (
        <>
            <div className="user rounds" onClick={() => { getHistoryQuestions(Room.id, Room.idUser) }}>
                <h2 className="nameUsers">{Room.nameRoom}</h2>
                <div className="backGroundRoom">
                    <div className="infoStubents" style={{ cursor: "text" }}>
                        <span className="scoreRound" onClick={() => { setUser({ id: Room.idUser, last_name: Room.last_name, first_name: Room.first_name }) }}> User "{Room.last_name} {Room.first_name}" </span><br />and it was a result<br />
                        {Room.victories} to {Room.losses}, in {Room.roundPlay} Rounds
                    </div>
                </div>
            </div>
        </>
    );
}
//It was played with the user Ahmed 