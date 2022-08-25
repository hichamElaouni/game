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
  const [questions, setQuestions] = useState({});
  const [occurence, setOccurence] = useState(0);
  const [pauseGame, setPauseGame] = useState(true);
  const [xPlaying, setXPlaying] = useState(true);
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
  const [turn, setTurn] = useState(true);
  // for stop insert players
  const [flag, setFlag] = useState(true);
  const [namePlayer, setNamePlayer] = useState("");
  const [idPlayer, setIdPlayer] = useState(0);
  const [stateRoom, setStateRoom] = useState(false);
  const [currentCount, setCount] = useState(10000);
  const [textWait, setTextWait] = useState("Wait to anothor Player to Join");
  const [over, setOver] = useState(false);
  const [waitState, setWaitState] = useState(false);

  const [answer, setAnswer] = useState(1);
  const [choices, setChoices] = useState(["2;4;6;8"]);
  const [idQuestion, setIdQuestions] = useState(0);
  const [title, setTitle] = useState("Answer Question and click next to Play");
  const [timeTurn, setTimeTurn] = useState(10);
  const [pointQu, setPointQu] = useState(0);
  const [pointGa, setPointGa] = useState(2);

  const [searchParams] = useSearchParams();
  const PlayerName = searchParams.get("NamePlayer");
  const PlayerId = searchParams.get("PlayerId");
  const token = searchParams.get("token");

  const getQuestion = async (token, id, setQuestions) => {
    const {
      data: { data, success, limit },
    } = await getQuestionByRoom({ token, id });
    if (!success) console.log("error data");
    else {
      if (turn && limit) {
        console.log("GameOver");
        setOver(true);
      } else {
        setQuestions(data);
      }
    }
  };

  useEffect(() => {
    getQuestion(token, occurence, setQuestions);
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
      setCount(timeTurn);
    }
    socket.on("getStateRoom", () => {
      setStateRoom(false);
      setCount(timeTurn);
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

    if (questions.length != undefined) {
      setIdQuestions(questions[0]["Question.id"]);
      setAnswer(questions[0]["Question.answer"]);
      setChoices(questions[0]["Question.choices"]);
      setTitle(questions[0]["Question.title"]);
      setPointQu(questions[0]["Question.point"]);
      setPointGa(questions[0]["Rooms.point"]);
      setTimeTurn(questions[0]["Rooms.TimeTurn"]);
    }
  }, [questions]);

  const pointGame = pointGa;

  return (
    <>
      <div className={`PartGames `}>
        <section className="SectionP1">
          {visible && turn ? (
            <Question
              idPlayer={idPlayer}
              namePlayer={namePlayer}
              questions={questions}
              title={title}
              choices={choices}
              setVisible={setVisible}
              setOccurence={setOccurence}
              setPauseGame={setPauseGame}
              scores={scores}
              setScores={setScores}
              currentCount={currentCount}
              setCount={setCount}
              answer={answer}
              pointQu={pointQu}
              idQuestion={idQuestion}
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
              setCount={setCount}
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
          text={textWait}
          waitState={waitState}
        />
      </div>
    </>
  );
}

export default App;
