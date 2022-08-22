import React, { useState } from "react";
import Grid from "./Grid";
import AddQuestion from "./AddQuestion";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import ViewRooms from "./ViewRooms";

import "./question.css";

function Questions() {
  const [questions, setQuestions] = useState([]);

  return (
    <>
      <div className="AllCompQues">
        <div className="gridRooms">
          <div className="grid">
            <h1>Questions</h1>
            <Grid questions={questions} setQuestions={setQuestions} selected={false} />
          </div>
          <div className="RoomsView">
            <h1>Rooms</h1>
            <ViewRooms />
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
