import { useState } from "react";
import ListChoices from "../Choice/ListChoices";
import Timer from "../Timer/Timer";
import { socket } from "../service/socket";

const NextQuestion = (
  setVisible,
  setlastId,
  setPauseGame,
  checkAnswer,
  idPlayer,
  scores,
  setScores,
  point,
  idQuestion
) => {
  setlastId(idQuestion);
  setPauseGame(false);
  setVisible(false);

  if (checkAnswer) {
    if (idPlayer * 1 === 1) {
      let { xScore } = scores;
      xScore += point;
      setScores({ ...scores, xScore });
      socket.emit("setxScore", xScore);
    } else if (idPlayer * 1 === 2) {
      let { oScore } = scores;
      oScore += point;
      setScores({ ...scores, oScore });
      socket.emit("setoScore", oScore);
    }
  }
};

export default function Question(props) {
  const {
    idPlayer,
    namePlayer,
    questions = {},
    setVisible,
    setlastId,
    setPauseGame,
    countDown,
    setCountDown,
    scores,
    setScores,
  } = props;

  const [checkAnswer, setChaeckAnswer] = useState(false);
  let idQuestion = questions.id;
  console.log(
    "🚀 ~ file: Question.js ~ line 52 ~ Question ~ questions",
    questions
  );
  const onclick = (event) => {
    if (questions?.answer === event?.target?.value * 1) {
      setChaeckAnswer(true);
    } else {
      setChaeckAnswer(false);
    }
  };
  let Choices = ";";

  if (!(questions?.choices === undefined))
    Choices = questions?.choices.toString();

  const point = 2;

  return (
    <div className="players ">
      <h1>{namePlayer}</h1>
      <div className="boardquetion">
        <Timer
          setPauseGame={setPauseGame}
          idQuestion={idQuestion}
          setVisible={setVisible}
          checkAnswer={checkAnswer}
          idPlayer={idPlayer}
          scores={scores}
          setScores={setScores}
          point={point}
          setlastId={setlastId}
          countDown={countDown}
          setCountDown={setCountDown}
        />
        <h2 className="TitleQuestion">{questions?.title}</h2>

        <div className="container">
          <ListChoices choice={Choices.split(";")} onclick={onclick} />
        </div>

        <input
          type="submit"
          className="btnNext"
          value="Next"
          onClick={() =>
            NextQuestion(
              setVisible,
              setlastId,
              setPauseGame,
              checkAnswer,

              idPlayer,
              scores,
              setScores,
              point,
              idQuestion
            )
          }
        ></input>
      </div>
    </div>
  );
}
