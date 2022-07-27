import React, { useState, Fragment, useEffect } from "react";

import { getAllRooms, getGameById } from "../../service/api";

// create function to get All informations about 3 tables(question games room)
const getRooms = async (setRooms) => {
  const {
    data: { data, success },
  } = await getAllRooms();
  if (!success) console.log("error data");
  else setRooms(data);
};

const getGame = async (id, setGames) => {
  const {
    data: { data, success },
  } = await getGameById(id);
  if (!success) console.log("error data");
  else setGames(data);
};

export default function ViewGames(props) {
  const { lengthQuestionsGame } = props;
  const [rooms, setRooms] = useState([]);
  const [games, setGames] = useState([]);
  // const [occurence, setOccurence] = useState(1);

  useEffect(() => {
    getRooms(setRooms);
  }, []);

  const getNameGame = () => {
    // await getGame(1, setGames);
    // console.log("games");
  };
  const getQuestionsGame = (event) => {
    console.log(games);
  };

  // const title =;

  return (
    <>
      {rooms.map((room, key) => (
        <Fragment key={key}>
          <div
            className="view"
            key="hh"
            id={room.id}
            onClick={(event) => console.log(event.currentTarget.id)}
          >
            <h3 className="titleRoom">
              {room.nameRoom}/{getNameGame}
            </h3>
            <div className="imggame">
              <div className="infoGame"></div>
              <p className="infoo">
                {lengthQuestionsGame} Questions
                <br id="4" />
                {room.point} point
              </p>
            </div>
          </div>
        </Fragment>
      ))}
    </>
  );
}
