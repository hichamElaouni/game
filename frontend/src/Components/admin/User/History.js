import React, { useEffect, useRef, useState } from "react";
import { getRoomsHistory, getAllHistoryQuestions } from "../../service/api";
import Rounds from "./Rounds";
import Pagination from "../../Setings/Pagination";

export default function History(props) {
  const { User } = props;

  const [user, setUser] = useState(User);
  const [questionsHistory, setQuestionsHistory] = useState();
  const refLengthTable = useRef(0);

  const refEffect = useRef(false);
  const [limit, setLimit] = useState(25);
  const [page, setPage] = useState(1);

  let RoomsHistory = useRef([]);

  const getHistoryRooms = async (limit, page) => {
    const {
      data: { data, success, lengthTable },
    } = await getRoomsHistory(user.id, limit, page);
    if (!success) console.log("error data");
    else {
      RoomsHistory.current = [];
      data.map((room) => {
        const { Rooms, User, ...rest } = room;
        RoomsHistory.current = [
          ...RoomsHistory.current,
          {
            idUser: User.id,
            last_name: User.last_name,
            first_name: User.first_name,
            nameRoom: Rooms.nameRoom,
            ...rest,
          },
        ];
      });

      refLengthTable.current = lengthTable / limit;

      getHistoryQuestions(data[0].id, User.id);
    }
  };

  useEffect(() => {
    if (refEffect.current) {
      getHistoryRooms(limit, page);
    }
    return () => {
      refEffect.current = true;
    };
  }, [limit, page]);

  const getHistoryQuestions = async (idRoomHistory, idUser) => {
    const {
      data: { data, success },
    } = await getAllHistoryQuestions(idRoomHistory, idUser);
    if (!success) console.log("error data");
    else {
      let history = [];
      data.map((result) => {
        const { Question, ...rest } = result;
        history = [
          ...history,
          { ...Question, selectedAnswer: rest.selectedAnswer },
        ];
      });

      setQuestionsHistory(history);
    }
  };

  const Style = {
    background: "#79746e1a",
    textAlign: "center",
    fontSize: "1.4em",
    borderBottom: "3px solid silver",
  };

  return (
    <>
      <div className="ShartQuestion">
        <div className="div-Shart">
          <h1>Shart for Leter</h1>
        </div>
        <div className="historyQuestions">
          <table>
            <thead>
              <tr>
                <th>Question</th>
                <th>Correct Answer</th>
                <th>Selected Answer</th>
              </tr>
            </thead>
            <tbody>
              {questionsHistory !== undefined &&
                questionsHistory.map((question, key) => (
                  <tr
                    key={key}
                    className={
                      question.answer === question.selectedAnswer
                        ? "trueAnswer"
                        : "falseAnswer"
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <td>{question.title}</td>
                    <td>{question.answer}</td>
                    <td>{question.selectedAnswer}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="line-3"></div>
      <h3 style={Style}>
        User {user.first_name} {user.last_name} played{" "}
        {RoomsHistory.current.length} with :
      </h3>
      <div className="historyRounds">
        {RoomsHistory.current.map((rooms, key) => (
          <Rounds
            key={key}
            Room={rooms}
            setUser={setUser}
            getHistoryQuestions={getHistoryQuestions}
          />
        ))}
      </div>

      <Pagination
        lengthPages={refLengthTable.current}
        setPage={setPage}
        setLimit={setLimit}
      />
    </>
  );
}
