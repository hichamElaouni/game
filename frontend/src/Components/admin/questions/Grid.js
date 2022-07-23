import React, { useState, Fragment, useEffect } from "react";

import "./grid.css";

import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import AddQuestion from "./AddQuestion";
import {
  getAllQUestions,
  addQuestion,
  deleteQuestion,
  updateQuestion,
} from "../../service/api";
import ViewGames from "./ViewGames";

import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import ListRooms from "../pages/Room/ListRooms";

const getQuestions = async (setQuestions) => {
  const {
    data: { data, success },
  } = await getAllQUestions();
  if (!success) console.log("error data");
  else setQuestions(data);
};

const Grid = () => {
  const [questions, setQuestions] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getQuestions(setQuestions);
  }, []);

  const [addFormData, setAddFormData] = useState({
    id: "",
    title: "",
    choices: "",
    answer: "",
    point: "",
  });

  const [editFormData, setEditFormData] = useState({
    title: "",
    choices: "",
    answer: "",
    point: "",
  });

  const [editQuestionid, seteditQuestionid] = useState(null);

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

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();

    const editQuestion = {
      id: editQuestionid,
      title: editFormData.title,
      choices: editFormData.choices,
      answer: editFormData.answer,
      point: editFormData.point,
    };

    const newQuestions = [...questions];

    const index = questions.findIndex(
      (question) => question.id === editQuestionid
    );

    newQuestions[index] = editQuestion;

    await updateQuestion(editQuestionid, editQuestion);
    setQuestions(newQuestions);
    seteditQuestionid(null);

    NotificationManager.info("succufully Editing", "Info", 3000);
  };

  const handleEditClick = (event, question) => {
    event.preventDefault();
    seteditQuestionid(question.id);

    const formValues = {
      title: question.title,
      choices: question.choices,
      answer: question.answer,
      point: question.point,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    seteditQuestionid(null);
  };

  const handleDeleteClick = async (questionId) => {
    const newQuestions = [...questions];
    const index = questions.findIndex((question) => question.id === questionId);
    newQuestions.splice(index, 1);
    setOpen(false);
    console.log(questionId);
    NotificationManager.info(
      " succufully  deleted ",
      "info",
      3000,
      await deleteQuestion(questionId)
    );

    setQuestions(newQuestions);
  };

  return (
    <>
      <div className="viewgrid">
        <form onSubmit={handleEditFormSubmit}>
          <table>
            <thead>
              <tr>
                <th style={{ width: "5%" }}>id</th>
                <th>Question</th>
                <th>Choice</th>
                <th>Answer</th>
                <th>Point</th>
                <th style={{ width: "14%" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question, key) => (
                <Fragment key={key}>
                  {editQuestionid === question.id ? (
                    <EditableRow
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                    />
                  ) : (
                    <ReadOnlyRow
                      question={question}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                    />
                  )}
                  {/* <DailogConfirm
                    setOpen={setOpen}
                    open={open}
                    handleDeleteClick={handleDeleteClick}
                  /> */}
                </Fragment>
              ))}
            </tbody>
          </table>
        </form>

        <div className="viewGames">
          <ViewGames lengthQuestionsGame={questions.length} />
          {/* <ListRooms/> */}
        </div>
      </div>

      <div className="addquestion">
        <h2>Add a question</h2>

        <AddQuestion
          handleAddFormSubmit={handleAddFormSubmit}
          handleAddFormChange={handleAddFormChange}
        />
      </div>
      <NotificationContainer />
    </>
  );
};

export default Grid;
