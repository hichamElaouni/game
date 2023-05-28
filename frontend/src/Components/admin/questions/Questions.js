import React, { useState, useEffect, useRef } from "react";
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
  const [levels, setLevels] = useState([]);


  const refLengthTable = useRef(0);
  const page = useRef(1);
  const limit = useRef(25);



  const getQuestions = async (Limit, Page, idSubject, level) => {
    const {
      data: { data, success, subjects, levels, lengthTable },
    } = await getAllQUestions(Limit, Page, idSubject, level);
    if (!success) console.log("error data");
    else {

      let resultData = []

      data.map((dt) => {
        const { Subjects, Levels, ...rest } = dt;
        return (
          resultData = [
            ...resultData,
            {
              nameSubject: Subjects[0].name,
              levelNumber: Levels[0].levelNumber,
              ...rest,
            },
          ]
        );
      });

      setQuestions(resultData);
      setLevels(levels);
      setSubjects(subjects);
      refLengthTable.current = lengthTable
    }
  };

  useEffect(() => {
    getQuestions(limit.current, page.current);
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
              levels={levels}
              getQuestions={getQuestions}
              lengthTable={refLengthTable.current}
              selected={false}
              page={page}
              limit={limit}
            />
          </div>
          <div className="RoomsView">
            <h1 className="titleRooms" onClick={() => getQuestions(limit.current, page.current)}>Rooms</h1>
            <ViewRooms setQuestions={setQuestions} questions={questions} refLengthTable={refLengthTable} />
          </div>
        </div>

        <div className="addquestion">
          <h1>Add a question</h1>
          <AddQuestion questions={questions} setQuestions={setQuestions} subjects={subjects} levels={levels} />
        </div>
      </div>

    </>
  );
}
export default Questions;
