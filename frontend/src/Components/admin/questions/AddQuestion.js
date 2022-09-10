import React, { useState } from "react";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { addQuestion } from "../../service/api";

export default function AddQuestion(props) {
  const { questions, setQuestions } = props;

  const [addFormData, setAddFormData] = useState({
    id: "",
    title: "",
    choices: "",
    answer: "",
    point: "",
  });

  const [answerNumber, setAnswerNumber] = useState(false);

  const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = async (event) => {
    event.preventDefault();

    const choices = event.target[1].value;
    const NbChoices = choices.split(";").length;
    const answer = event.target[2].value;

    if (answer <= NbChoices) {
      const newQuestion = {
        title: event.target[0].value,
        choices,
        answer,
        point: event.target[3].value,
      };

      await addQuestion(newQuestion);
      const newQuestions = [...questions, newQuestion];
      setQuestions(newQuestions);

      event.target[0].value = "";
      event.target[1].value = "";
      event.target[2].value = "";
      event.target[3].value = "";

      NotificationManager.success("succufully added", newQuestion.title, 3000);
      setAnswerNumber(false);
    } else {
      NotificationManager.error(
        "The answer number must be less than or equal to the number of Choices",
        "error",
        3000,
        setAnswerNumber(true)
      );
    }
  };

  return (
    <form onSubmit={handleAddFormSubmit}>
      <input
        type="text"
        name="Question"
        required="required"
        placeholder="Enter a Question ..."
        onChange={handleAddFormChange}
      />
      <input
        type="text"
        name="Choices"
        required="required"
        placeholder="Enter an Choices..."
        onChange={handleAddFormChange}
      />
      <input
        type="text"
        name="Answer"
        required="required"
        placeholder="Enter a Answer..."
        onChange={handleAddFormChange}
        pattern="[0-9]*"
        title="please enter number only"
        className={`${answerNumber ? "AnswerNumber" : ""}`}
      />
      <input
        type="text"
        name="Point"
        required="required"
        placeholder="Enter Point..."
        onChange={handleAddFormChange}
        pattern="[0-9]*"
        title="please enter number only"
      />
      <button type="submit" className="btns btnAddQuestion">
        Add
      </button>
    </form>
  );
}
