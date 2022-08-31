import React, { useState, useEffect } from "react";
import { getQuestionByRoom } from "./service/api";
import Question from "./Question/Question";
import Game from "./TicTacToe/Game";
import Waiting from "./waiting/Waiting";
import { ScoreBoard } from "./Score/ScoreBoard";
import { useSearchParams } from "react-router-dom";
import { socket } from "./service/socket";

function App() {
  const [visible, setVisible] = useState(true);
  const [xPlaying, setXPlaying] = useState(true);
  const [turn, setTurn] = useState(true);
  const [pauseGame, setPauseGame] = useState(true);
  const [flag, setFlag] = useState(true);
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
  const [namePlayer, setNamePlayer] = useState("");
  const [idPlayer, setIdPlayer] = useState(0);
  const [stateRoom, setStateRoom] = useState(false);
  const [over, setOver] = useState(false);
  const [waitState, setWaitState] = useState(false);
  const [textWait, setTextWait] = useState("Wait to anothor Player to Join");

  const [countDown, setCountDown] = useState(1000);

  const [lastId, setlastId] = useState(0);

  const [roomQuestions, setRoomQuestions] = useState([]);

  const [timeTurn, setTimeTurn] = useState(10);

  const [searchParams] = useSearchParams();
  const PlayerName = searchParams.get("NamePlayer");
  const PlayerId = searchParams.get("PlayerId");
  const token = searchParams.get("token");

  const getQuestion = async (token, id, setRoomQuestions) => {
    const {
      data: { data, success, limit },
    } = await getQuestionByRoom({ token, id });
    if (!success) console.log("error data");
    else {
      if (turn && limit) {
        console.log("Game Over");
        setOver(true);
      } else {
        setRoomQuestions(data);
        setTimeTurn(data[0]?.Rooms[0]?.TimeTurn);
      }
    }
  };

  useEffect(() => {
    getQuestion(token, lastId, setRoomQuestions);
    setIdPlayer(PlayerId);
    setNamePlayer(PlayerName);

    if (flag && PlayerId == 1) {
      setTurn(true);
      setXPlaying(true);
      setFlag(false);
      setStateRoom(true);
      setVisible(false);
    }
    if (flag && PlayerId == 2) {
      setTurn(false);
      setXPlaying(false);
      setFlag(false);
      setStateRoom(false);
      socket.emit("setStateRoom");
      setCountDown(timeTurn);
    }
    socket.on("getStateRoom", () => {
      setStateRoom(false);
      setCountDown(timeTurn);
      setVisible(true);
    });

    socket.on("getGameOver", () => {
      setOver(true);
      setWaitState(true);
    });
    socket.on("getOver", (MsgOver) => {
      setStateRoom(true);
      setTextWait(MsgOver);
      setWaitState(true);
    });
  }, [lastId]);

  const { Question: questions, Rooms } = roomQuestions[0] || {};

  const pointGame = Rooms?.point;

  return (
    <>
      <div className={`PartGames `}>
        <section className="SectionP1">
          {visible && turn ? (
            <Question
              namePlayer={namePlayer}
              setVisible={setVisible}
              setPauseGame={setPauseGame}
              scores={scores}
              setScores={setScores}
              setCountDown={setCountDown}
              countDown={countDown}
              setlastId={setlastId}
              lastId={lastId}
              idPlayer={idPlayer}
              questions={questions}
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
              over={over}
              setCountDown={setCountDown}
              timeTurn={timeTurn}
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
              setlastId={setlastId}
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
          text={textWait}
          waitState={waitState}
          token={token}
        />
      </div>
    </>
  );
}

export default App;
