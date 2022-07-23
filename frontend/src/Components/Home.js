import React, { useState, useEffect } from "react";
import { getQuestionById } from "./service/api";
import Question from "./Question/Question";
import Game from "./TicTacToe/Game";
import WaitQuestion from "./waiting/WaitQuestion";
import { ScoreBoard } from "./Score/ScoreBoard";

import Menu from "./Menu/Menu";
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
  const [timer, setTimer] = useState(true);
  const [xPlaying, setXPlaying] = useState(true);
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
  const [turn, setTurn] = useState(true);
  // console.log("turn ==> ", turn, "visible ==> ", visible);
  useEffect(() => {
    getQuestion(occurence, setQuestions);
  }, [occurence]);
  const namePlayer = ["hicham ; karim"];
  const pointGame = 2;
  let player = ";";
  if (namePlayer === undefined) {
  } else {
    player = namePlayer.toString().split(";");
  }
  // const scores = "0";
  // const idtimer = document.querySelector("#timer").innerHTML;

  return (
    <>
      <Menu style={{ justifyContent: "flex-end", background: "#404a46" }} />

      <div className="PartGames">
        <section className="SectionP1">
          {visible && turn ? (
            <Question
              idPlayer={1}
              namePlayer={player[0]}
              questions={questions}
              setVisible={setVisible}
              setOccurence={setOccurence}
              setTimer={setTimer}
              turn={turn}
              setTurn={setTurn}
              scores={scores}
              setScores={setScores}
            />
          ) : (
            <WaitQuestion namePlayer={player[0]} />
          )}
        </section>
        <div className="flex-score-game">
          <ScoreBoard
            scores={scores}
            xPlaying={xPlaying}
            namePlayer={namePlayer}
          />
          <section className={`SectionG  ${timer ? "pauseGame" : ""}`}>
            <Game
              xPlaying={xPlaying}
              setXPlaying={setXPlaying}
              scores={scores}
              setScores={setScores}
              turn={turn}
              setTurn={setTurn}
              setTimer={setTimer}
              setVisible={setVisible}
              pointGame={pointGame}
            />
          </section>
        </div>
        <section className="SectionP2">
          {!visible && !turn ? (
            <Question
              idPlayer={2}
              namePlayer={player[1]}
              questions={questions}
              setVisible={setVisible}
              setOccurence={setOccurence}
              setTimer={setTimer}
              turn={turn}
              setTurn={setTurn}
              scores={scores}
              setScores={setScores}
            />
          ) : (
            <WaitQuestion namePlayer={player[1]} />
          )}
        </section>
      </div>
    </>
  );
}

export default App;
