import { useState } from "react";
import ListChoices from "../Choice/ListChoices";
import CountDown from "../Timer/CountDown";
import { socket } from "../service/socket";
import { NextQuestion } from "../Setings/Controllers";


const NextQuestions = async (
  setVisible,
  setlastId,
  lastId,
  setPauseGame,
  checkAnswer,
  indexPlayer,
  point,
  idQuestion,
  answerSelected,
  idUser,
  addQuestionHistory,
  scores,
  idHistoryRoom,
  AddRoomHistory
) => {


  const data = lastId === 0 && parseInt(indexPlayer) === 1 ? await AddRoomHistory(idUser, lastId) : idHistoryRoom;


  const questionshistory = {
    idQuestion: idQuestion,
    idUser: idUser,
    selectedAnswer: !answerSelected ? 0 : answerSelected,
    idRoomHistory: idHistoryRoom === 0 ? data.idHistoryRoom : idHistoryRoom,
  };

  await addQuestionHistory(questionshistory);

  if (checkAnswer) {
    if (parseInt(indexPlayer) === 1) {
      scores.current.xScore += point;
      socket.emit("setxScore", scores.current.xScore);
    } else if (parseInt(indexPlayer) === 2) {
      scores.current.oScore += point;
      socket.emit("setoScore", scores.current.oScore);
    }
  }


  setPauseGame(false);
  setVisible(false);
  setlastId(idQuestion);
};

export default function Question(props) {
  const {
    indexPlayer,
    questions = {},
    setVisible,
    setlastId,
    lastId,
    setPauseGame,
    count,
    user,
    idHistoryRoom,
    scores,
    AddRoomHistory,
  } = props;

  const [checkAnswer, setChaeckAnswer] = useState(false);
  const [answerSelected, setAnswerSelected] = useState();

  let idQuestion = questions.id;


  const onclick = (event) => {
    setAnswerSelected(event?.target?.value);
    setChaeckAnswer(questions?.answer === parseInt(event?.target?.value));
  };
  let Choices = ";";

  if (!(questions?.choices === undefined))
    Choices = questions?.choices.toString();

  const point = questions?.point;

  return (
    <div className="players ">
      <h1>{user.current.first_name + " " + user.current.last_name}</h1>
      <div className="boardquetion">
        <CountDown
          setVisible={setVisible}
          setlastId={setlastId}
          lastId={lastId}
          setPauseGame={setPauseGame}
          checkAnswer={checkAnswer}
          indexPlayer={indexPlayer}
          point={point}
          idQuestion={idQuestion}
          answerSelected={answerSelected}
          idUser={user.current.id}
          scores={scores}
          idHistoryRoom={idHistoryRoom}
          AddRoomHistory={AddRoomHistory}
          count={count}
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
              lastId,
              setPauseGame,
              checkAnswer,
              indexPlayer,
              point,
              idQuestion,
              answerSelected,
              user.current.id,
              addQuestionHistory,
              scores,
              idHistoryRoom,
              AddRoomHistory,

            )
          }
        ></input>
      </div>
    </div>
  );
}
