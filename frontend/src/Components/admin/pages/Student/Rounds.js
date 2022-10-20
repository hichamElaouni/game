import React from "react";

export default function Rounds(props) {
    const { Room, setStudent, getHistoryQuestions } = props;
    return (
        <>
            <div className="student rounds" onClick={() => { getHistoryQuestions(Room.id, Room.idStudent) }}>
                <h2 className="nameStudents">{Room.nameRoom}</h2>
                <div className="backGroundRoom">
                    <div className="infoStubents" style={{ cursor: "text" }}>
                        <span className="scoreRound" onClick={() => { setStudent({ id: Room.idStudent, fullName: Room.nameStudent }) }}> Student "{Room.nameStudent}" </span><br />and it was a result<br />
                        {Room.victories} to {Room.losses}, in {Room.roundPlay} Rounds
                    </div>
                </div>
            </div>
        </>
    );
}
//It was played with the student Ahmed 