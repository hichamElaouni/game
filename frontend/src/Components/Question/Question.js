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
  idQuestion,
  questionHistory,
  setQuestionHistory,
  answerSelected
) => {
  setlastId(idQuestion);
  setPauseGame(false);
  setVisible(false);

  setQuestionHistory([
    ...questionHistory,
    {
      idQuestion: idQuestion,
      idStudent: idPlayer,
      answerSelected: !answerSelected ? 0 : answerSelected,
    },
  ]);

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
    questionHistory,
    setQuestionHistory,
  } = props;

  const [checkAnswer, setChaeckAnswer] = useState(false);
  const [answerSelected, setAnswerSelected] = useState();

  let idQuestion = questions.id;

  const onclick = (event) => {
    setAnswerSelected(event?.target?.value);
    setChaeckAnswer(questions?.answer === event?.target?.value * 1);
  };
  let Choices = ";";

  if (!(questions?.choices === undefined))
    Choices = questions?.choices.toString();

  const point = questions?.point;

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
              idQuestion,
              questionHistory,
              setQuestionHistory,
              answerSelected
            )
          }
        ></input>
      </div>
    </div>
  );
}
