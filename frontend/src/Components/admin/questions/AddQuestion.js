import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { addQuestion } from "../../service/api";

export default function AddQuestion(props) {
  const { questions, setQuestions, subjects } = props;

  // const [addFormData, setAddFormData] = useState({
  //   id: "",
  //   title: "",
  //   choices: "",
  //   answer: "",
  //   point: "",
  // });

  const [answerNumber, setAnswerNumber] = useState(false);

  // const handleAddFormChange = (event) => {
  //   event.preventDefault();
  // const fieldName = event.target.getAttribute("name");
  // const fieldValue = event.target.value;

  // const newFormData = { ...addFormData };
  // newFormData[fieldName] = fieldValue;

  // setAddFormData(newFormData);


  // };

  const addNewQuestion = async (event) => {
    event.preventDefault();



    const choices = event.target[2].value;
    const NbChoices = choices.split(";").length;
    const answer = event.target[3].value;

    if (parseInt(event.target[0].value) !== 0) {
      if (answer <= NbChoices) {
        const newQuestion = {
          idSubject: event.target[0].value,
          title: event.target[1].value,
          choices,
          answer,
          point: event.target[4].value,
          nameSubject: subjects[subjects.findIndex((subject) => subject.id === parseInt(event.target[0].value))].name,
        };

        NotificationManager.success("succufully added", newQuestion.title, 3000, await addQuestion(newQuestion));

        const newQuestions = [...questions, newQuestion];


        setQuestions(newQuestions);

        event.target[0].value = 0;
        event.target[1].value = "";
        event.target[2].value = "";
        event.target[3].value = "";
        event.target[4].value = "";


        setAnswerNumber(false);

      } else {
        NotificationManager.error(
          "The answer number must be less than or equal to the number of Choices",
          "error",
          3000,
          setAnswerNumber(true)
        );
      }
    } else {
      NotificationManager.error(
        "select Subject first",
        "error",
        3000,

      );
    }

  };

  return (
    <form className="formAddQuestion" onSubmit={addNewQuestion}>
      <select
        name="subject"
        defaultValue={0}

      // onChange={handleAddFormChange}
      >
        <option value="0" disabled >Select  Subject</option>
        {
          subjects.map((subject, key) => (
            <option key={key} value={subject.id} required>{subject.name}</option>
          )
          )}
      </select>
      <input
        type="text"
        name="Question"
        required="required"
        placeholder="Enter a Question ..."
      // onChange={handleAddFormChange}
      />
      <input
        type="text"
        name="Choices"
        required="required"
        placeholder="Enter an Choices..."
      // onChange={handleAddFormChange}
      />
      <input
        type="text"
        name="Answer"
        required="required"
        placeholder="Enter a Answer..."
        // onChange={handleAddFormChange}
        pattern="[0-9]*"
        title="please enter number only"
        className={`${answerNumber ? "AnswerNumber" : ""}`}
      />
      <input
        type="text"
        name="Point"
        required="required"
        placeholder="Enter Point..."
        // onChange={handleAddFormChange}
        pattern="[0-9]*"
        title="please enter number only"
      />

      <button type="submit" className="btns btnAddQuestion" >
        Add
      </button>
    </form>
  );
}