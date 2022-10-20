import React, { useState, Fragment } from "react";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import { deleteQuestion, updateQuestion } from "../../service/api";

import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";

const Grid = (props) => {
  const [open, setOpen] = useState(false);
  const { questions, setQuestions, getselectedQuestions, selected } = props;

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

    NotificationManager.success(
      "succufully Editing",
      "Question updated ",
      3000
    );
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

    NotificationManager.success(
      " succufully  deleted ",
      "Question deleted",
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
                {selected ? (
                  <th style={{ width: "7%" }}>Selection Questions</th>
                ) : (
                  ""
                )}
                <th>Question</th>
                <th>Choice</th>
                <th>Answer</th>
                <th>Point</th>
                <th style={{ width: "18%" }}>Actions</th>
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
                      selected={selected}
                    />
                  ) : (
                    <ReadOnlyRow
                      question={question}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                      getselectedQuestions={getselectedQuestions}
                      selected={selected}
                    />
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </form>
      </div>
    </>
  );
};

export default Grid;
