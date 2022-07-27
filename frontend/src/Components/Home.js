import React, { useState, useEffect } from "react";
import { getQuestionById } from "./service/api";
import Question from "./Question/Question";
import Game from "./TicTacToe/Game";
import WaitQuestion from "./waiting/WaitQuestion";
import { ScoreBoard } from "./Score/ScoreBoard";

import Menu from "./Menu/Menu";
import io from "socket.io-client"


const { REACT_APP_BACKEND_URL, REACT_APP_BACKEND_PORT } = process.env || {};
const fullUrl = `${REACT_APP_BACKEND_URL}:${REACT_APP_BACKEND_PORT}`;

const socket = io.connect(fullUrl);

const getQuestion = async (id, setQuestions) => {
  const {
    data: { data, success },
  } = await getQuestionById(id);
  if (!success) console.log("error data");
  else setQuestions(data);
};
function App() {
  const [visible, setVisible] = useState(true);
  const [questions, setQuestions] = useState({});
  const [occurence, setOccurence] = useState(0);
  const [pauseGame, setPauseGame] = useState(true);
  const [xPlaying, setXPlaying] = useState(true);
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });


  const [idroom, setIdroom] = useState("");
  const [namePlayer, setNamePlayer] = useState("");
  const [idPlayer, setIdPlayer] = useState(0);



  useEffect(() => {
    getQuestion(occurence, setQuestions);
    socket.on("receive", ({ player, id }) => {
      setNamePlayer(player)
      setIdPlayer(id)
      id == 1 ? setXPlaying(true) : setXPlaying(false);
    });

  }, [occurence, socket]);

  const pointGame = 2;

  const join_Room = () => {
    if (idroom !== "") {
      socket.emit("join_Room", idroom);

    }
  }



  return (
    <>
      <Menu style={{ justifyContent: "flex-end", background: "#404a46" }} />
      <input type="text" placeholder="room" onChange={(event) => { setIdroom(event.target.value) }} ></input>
      <button value="send" onClick={join_Room}></button>
      <div className="PartGames">
        <section className="SectionP1">
          {visible && (idPlayer == 1 ? true : false) ? (
            <Question
              idPlayer={idPlayer}
              namePlayer={namePlayer}
              questions={questions}
              setVisible={setVisible}
              setOccurence={setOccurence}
              setPauseGame={setPauseGame}
              // turn={turn}
              // setTurn={setTurn}
              scores={scores}
              setScores={setScores}
            />
          ) : (
            <WaitQuestion namePlayer={namePlayer} />
          )}
        </section>
        <div className="flex-score-game">
          <ScoreBoard
            scores={scores}
            xPlaying={xPlaying}
            namePlayer={namePlayer}
            idPlayer={idPlayer}
          />
          <section className={`SectionG  ${pauseGame ? "pauseGame" : ""}`}>
            <Game
              xPlaying={xPlaying}
              setXPlaying={setXPlaying}
              scores={scores}
              setScores={setScores}
              // turn={turn}
              // setTurn={setTurn}
              setPauseGame={setPauseGame}
              setVisible={setVisible}
              pointGame={pointGame}
            />
          </section>
        </div>
        {/* <section className="SectionP2">
          {!visible && !turn ? (
            <Question
              idPlayer={2}
              namePlayer={player[1]}
              questions={questions}
              setVisible={setVisible}
              setOccurence={setOccurence}
              PauseGame={PauseGame}
              turn={turn}
              setTurn={setTurn}
              scores={scores}
              setScores={setScores}
            />
          ) : (
            <WaitQuestion namePlayer={player[1]} />
          )}
        </section> */}
      </div>
    </>
  );
}

export default App;
