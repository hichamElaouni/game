import { useState } from "react";
import ListChoices from "../Choice/ListChoices";
import Timer from "../Timer/Timer";
import { socket } from "../service/socket";

const NextQuestion = async (
  setVisible,
  setlastId,
  setPauseGame,
  checkAnswer,
  indexPlayer,
  point,
  idQuestion,
  answerSelected,
  idStudent,
  idHistoryRoom,
  addQuestionHistory,
  scores
) => {
  setPauseGame(false);
  setVisible(false);

  const questionshistory = {
    idQuestion: idQuestion,
    idStudent: idStudent,
    selectedAnswer: !answerSelected ? 0 : answerSelected,
    idRoomHistory: idHistoryRoom,
  };
  await addQuestionHistory(questionshistory);

  if (checkAnswer) {
    if (indexPlayer * 1 === 1) {
      scores.current.xScore += point;
      socket.emit("setxScore", scores.current.xScore);
    } else if (indexPlayer * 1 === 2) {
      scores.current.oScore += point;
      socket.emit("setoScore", scores.current.oScore);
    }
  }

  setlastId(idQuestion);
};

export default function Question(props) {
  const {
    indexPlayer,
    questions = {},
    setVisible,
    setlastId,
    setPauseGame,
    count,
    setScores,
    student,
    idHistoryRoom,
    addQuestionHistory,
    scores,
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
      <h1>{student.current.fullName}</h1>
      <div className="boardquetion">
        <Timer
          setPauseGame={setPauseGame}
          idQuestion={idQuestion}
          setVisible={setVisible}
          checkAnswer={checkAnswer}
          indexPlayer={indexPlayer}
          point={point}
          setlastId={setlastId}
          count={count}
          idStudent={student.current.id}
          answerSelected={answerSelected}
          addQuestionHistory={addQuestionHistory}
          idHistoryRoom={idHistoryRoom}
          scores={scores}
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
              indexPlayer,
              point,
              idQuestion,
              answerSelected,
              student.current.id,
              idHistoryRoom,
              addQuestionHistory,
              scores
            )
          }
        ></input>
      </div>
    </div>
  );
}
