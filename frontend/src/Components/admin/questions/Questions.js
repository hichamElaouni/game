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
  const [subjects, setSubjects] = useState([]);
  const getQuestions = async () => {
    const {
      data: { data, success, subjects },
    } = await getAllQUestions();
    if (!success) console.log("error data");
    else {

      // id ,idsubject , namesuject ... ,
      let resultData = []

      data.map((dt) => {
        const { Subjects, ...rest } = dt;
        return (
          resultData = [
            ...resultData,
            {
              nameSubject: Subjects[0].name,
              ...rest,
            },
          ]
        );
      });


      setQuestions(resultData);

      setSubjects(subjects);
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
              subjects={subjects}

              selected={false}

            />
          </div>
          <div className="RoomsView">
            <h1 className="titleRooms" onClick={getQuestions}>Rooms</h1>
            <ViewRooms setQuestions={setQuestions} questions={questions} />
          </div>
        </div>
        <div className="addquestion">
          <h1>Add a question</h1>
          <AddQuestion questions={questions} setQuestions={setQuestions} subjects={subjects} />
        </div>
      </div>
      <NotificationContainer />
    </>
  );
}
export default Questions;
