import React, { useState, useEffect } from "react";
import Grid from "./Grid";
import AddQuestion from "./AddQuestion";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import ViewRooms from "./ViewRooms";
import { getAllQUestions } from "../../service/api";

import "./question.css";

function Questions() {
  const [questions, setQuestions] = useState([]);

  const getQuestions = async (setQuestions) => {
    const {
      data: { data, success },
    } = await getAllQUestions();
    if (!success) console.log("error data");
    else {
      setQuestions(data);
    }
  };

  useEffect(() => {
    getQuestions(setQuestions);
  }, []);

  return (
    <>
      <div className="AllCompQues">
        <div className="gridRooms">
          <div className="grid">
            <h1>Questions {questions.length}</h1>
            <Grid
              questions={questions}
              setQuestions={setQuestions}
              selected={false}
            />
          </div>
          <div className="RoomsView">
            <h1>Rooms</h1>
            <ViewRooms setQuestions={setQuestions} questions={questions} />
          </div>
        </div>
        <div className="addquestion">
          <h1>Add a question</h1>
          <AddQuestion questions={questions} setQuestions={setQuestions} />
        </div>
      </div>
      <NotificationContainer />
    </>
  );
}
export default Questions;
