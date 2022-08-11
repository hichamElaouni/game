import React, { useState, useEffect } from "react";
import { getQuestionById } from "./service/api";
import Question from "./Question/Question";
import Game from "./TicTacToe/Game";
import Waiting from "./waiting/Waiting";
import { ScoreBoard } from "./Score/ScoreBoard";
import { useSearchParams, useNavigate } from "react-router-dom";
import { socket } from "./service/socket";

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
  const [flag, setFlag] = useState(true);
  const [namePlayer, setNamePlayer] = useState("");
  const [idPlayer, setIdPlayer] = useState(0);
  const [stateRoom, setStateRoom] = useState(false);
  const [currentCount, setCount] = useState(10000);

  let navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const PlayerName = searchParams.get("NamePlayer");
  const PlayerId = searchParams.get("PlayerId");

  useEffect(() => {
    getQuestion(occurence, setQuestions);
    setIdPlayer(PlayerId);
    setNamePlayer(PlayerName);

    if (PlayerId == 1 && flag) {
      setTurn(true);
      setXPlaying(true);
      setFlag(false);
      setStateRoom(true);
      setVisible(false);
    }
    if (PlayerId == 2 && flag) {
      setTurn(false);
      setXPlaying(false);
      setFlag(false);
      setStateRoom(false);
      socket.emit("setStateRoom");
    }
    socket.on("getStateRoom", () => {
      setStateRoom(false);
      setCount(3000);
      setVisible(true);
    });
  }, [occurence]);

  const pointGame = 2;

  return (
    <>
      <div className={`PartGames `}>
        <section className="SectionP1">
          {visible && turn ? (
            <Question
              idPlayer={idPlayer}
              namePlayer={namePlayer}
              questions={questions}
              setVisible={setVisible}
              setOccurence={setOccurence}
              setPauseGame={setPauseGame}
              scores={scores}
              setScores={setScores}
              currentCount={currentCount}
              setCount={setCount}
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
      <div className={`div-wait ${stateRoom ? "start-Playing" : ""} `}>
        <Waiting
          namePlayer={namePlayer}
          text="Wait to anothor Player to Join "
        />
      </div>
    </>
  );
}

export default App;
