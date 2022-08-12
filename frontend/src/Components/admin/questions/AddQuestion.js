import React, { useState, Fragment, useEffect } from "react";
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
    const newQuestion = {
      id: 0,
      title: event.target[0].value,
      choices: event.target[1].value,
      answer: event.target[2].value,
      point: event.target[3].value,
    };

    await addQuestion(newQuestion);
    const newQuestions = [...questions, newQuestion];
    setQuestions(newQuestions);

    event.target[0].value = "";
    event.target[1].value = "";
    event.target[2].value = "";
    event.target[3].value = "";
    // alert("A new question has been successfully added")

    NotificationManager.success("succufully added", newQuestion.title, 3000);
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
      />
      <input
        type="text"
        name="Point"
        required="required"
        placeholder="Enter Point..."
        onChange={handleAddFormChange}
        pattern="[0-9]*"
      />
      <button type="submit" className="btn btn-success">
        Add
      </button>
    </form>
  );
}
