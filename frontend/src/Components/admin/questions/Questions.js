import React, { useState } from "react";
import Grid from "./Grid";
import AddQuestion from "./AddQuestion";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import "./question.css";

function Questions() {
  const [questions, setQuestions] = useState([]);

  return (
    <>
      <div className="grid">
        <h1>Questions</h1>
        <Grid questions={questions} setQuestions={setQuestions} />
        <ddiv className="addquestion">
          <h2>Add a question</h2>
          <AddQuestion questions={questions} setQuestions={setQuestions} />
        </ddiv>
      </div>
      <NotificationContainer />
    </>
  );
}
export default Questions;
