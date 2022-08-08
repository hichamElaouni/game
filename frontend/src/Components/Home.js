import React, { useState, useEffect } from "react";
import { getQuestionById } from "./service/api";
import Question from "./Question/Question";
import Game from "./TicTacToe/Game";
import Waiting from "./waiting/Waiting";
import { ScoreBoard } from "./Score/ScoreBoard";
import { socket } from "./service/socket";
import { useSearchParams, useNavigate } from "react-router-dom";

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
  const [turn, setTurn] = useState(true);
  const [idroom, setIdroom] = useState("");
  const [namePlayer, setNamePlayer] = useState("");
  const [idPlayer, setIdPlayer] = useState(0);

  let navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const PlayerName = searchParams.get("NamePlayer");

  useEffect(() => {
    getQuestion(occurence, setQuestions);
    socket.emit("connected_Player", PlayerName);
    socket.on("startGame", ({ id, PlayerName, Turn }) => {
      setNamePlayer(PlayerName);
      setIdPlayer(id);

      console.log("🚀 ~ file: Home.js ~ line 43 ~ socket.on ~ id", id);
      console.log("🚀 ~ file: Home.js ~ line 45 ~ socket.on ~ Turn", Turn);
      id === 1 ? setXPlaying(false) : setXPlaying(true);
      setTurn(Turn);
    });
  }, [occurence, socket, PlayerName]);

  const pointGame = 2;

  return (
    <>
      <div className="PartGames">
        <section className="SectionP1">
          {visible && !turn ? (
            <Question
              idPlayer={idPlayer}
              namePlayer={namePlayer}
              questions={questions}
              setVisible={setVisible}
              setOccurence={setOccurence}
              setPauseGame={setPauseGame}
              scores={scores}
              setScores={setScores}
            />
          ) : (
            <Waiting namePlayer={namePlayer} text="Waiting " />
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
              idPlayer={idPlayer}
              setIdPlayer={setIdPlayer}
              setPauseGame={setPauseGame}
              setVisible={setVisible}
              pointGame={pointGame}
              turn={turn}
              setTurn={setTurn}
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
