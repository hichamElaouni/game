import React, { useState, Fragment, useEffect } from "react";

import "./grid.css";

import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import {
  getAllQUestions,
  deleteQuestion,
  updateQuestion,
} from "../../service/api";
import ViewGames from "./ViewGames";

import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";

const getQuestions = async (setQuestions) => {
  const {
    data: { data, success },
  } = await getAllQUestions();
  if (!success) console.log("error data");
  else setQuestions(data);
};

const Grid = (props) => {
  const [open, setOpen] = useState(false);
  const { questions, setQuestions, getselectedQuestions } = props;
  useEffect(() => {
    getQuestions(setQuestions);
  }, []);

  const [editFormData, setEditFormData] = useState({
    title: "",
    choices: "",
    answer: "",
    point: "",
  });

  const [editQuestionid, seteditQuestionid] = useState(null);

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
                      getselectedQuestions={getselectedQuestions}
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
    </>
  );
};

export default Grid;
