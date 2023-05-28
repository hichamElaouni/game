import React, { useState, Fragment, useEffect } from "react";
import { getAllRooms, getQuestionByRoom } from "../../service/api";

const getRooms = async (setRooms) => {
  const {
    data: { data, success },
  } = await getAllRooms();
  if (!success) console.log("error data");
  else setRooms(data);
};

export default function ViewRooms(props) {
  const { setQuestions, refLengthTable } = props;
  const [rooms, setRooms] = useState([]);

  const getQuestionsRoom = async (idRoom, setQuestions) => {
    const {
      data: { data, success, lengthTable },
    } = await getQuestionByRoom({ idRoom });
    if (!success) console.log("error data");
    else {
      const result = Object.keys(data).map((key) => data[key].Question);

      let resultData = []

      result.map((dt) => {
        const { Subjects, Levels, ...rest } = dt;
        return (
          resultData = [
            ...resultData,
            {
              nameSubject: Subjects[0].name,
              levelNumber: Levels[0].levelNumber,
              ...rest,
            },
          ]
        );
      });

      refLengthTable.current = lengthTable;
      setQuestions(resultData);
    }
  };
  useEffect(() => {
    getRooms(setRooms);
  }, []);

  const { Game } = rooms[0] || {};
  return (
    <>
      <div className="ViewRooms">
        {rooms.map((room, key) => (
          <Fragment key={key}>
            <div
              className="view"
              id={room.id}
              onClick={(event) =>
                getQuestionsRoom(event.currentTarget.id, setQuestions)
              }
            // onMouseEnter={(event) => console.log(event.currentTarget.id)}
            >
              <h3 className="titleRoom">{room.nameRoom}</h3>
              <div className="imgGame">
                <div className="infoGame"></div>
                <p className="DescRoom">
                  Game:{Game.nameGame}.
                  <br />
                  point: {room.point}.
                  <br />
                  Time Turn: {room.TimeTurn}s.
                </p>
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </>
  );
}
