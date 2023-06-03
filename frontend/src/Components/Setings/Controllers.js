import { socket } from "../service/socket";
import { addQuestionHistory } from "../service/api";


const PasswordCheck = (password) => {
  return password.match("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$") ? true : false;
}
const EmailCheck = (email) => {
  return email.match("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$") ? true : false;
}

const NextQuestion = async (
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
  scores,
  idHistoryRoom,
  AddRoomHistory,
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
}


export {
  PasswordCheck,
  EmailCheck,
  NextQuestion
}
