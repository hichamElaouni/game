import React, { useState, Fragment } from "react";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import { deleteQuestion, updateQuestion } from "../../service/api";

import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import Filter from "./Filter";

const Grid = (props) => {


  const { questions, setQuestions, getselectedQuestions, selected, subjects } = props;

  const [editFormData, setEditFormData] = useState({
    title: "",
    choices: "",
    answer: "",
    point: "",
    idSubject: "",
    nameSubject: "",
  });

  const [editQuestionid, seteditQuestionid] = useState(null);

  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...editFormData };

    newFormData[fieldName] = fieldValue;

    if (fieldName.toString() === "idSubject") {
      const nameSubject = subjects[subjects.findIndex((subject) => subject.id === parseInt(fieldValue))].name;
      newFormData["nameSubject"] = nameSubject;
    }

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
      idSubject: editFormData.idSubject,
      nameSubject: editFormData.nameSubject,
    };

    const newQuestions = [...questions];

    const index = questions.findIndex(
      (question) => question.id === editQuestionid
    );

    newQuestions[index] = editQuestion;


    NotificationManager.success(
      "succufully Editing",
      "Question updated ",
      3000,
      await updateQuestion(editQuestionid, editQuestion)
    );


    setQuestions(newQuestions);
    seteditQuestionid(null);

  };

  const handleEditClick = (event, question) => {
    event.preventDefault();

    seteditQuestionid(question.id);
    const nameSubject = subjects[subjects.findIndex((subject) => subject.id === parseInt(question.idSubject))].name;

    const formValues = {
      idSubject: question.idSubject,
      nameSubject: nameSubject,
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
    NotificationManager.success(
      " succufully  deleted ",
      "Question deleted",
      3000,
      await deleteQuestion(questionId)
    );
    setQuestions(newQuestions);
  };

  const filterData = () => {
    console.log("ok");
    // const filtr = questions.filter((question) => question.idSubject === 1 || question.idSubject === 3);
    // console.log("🚀 ~ file: Grid.js:111 ~ filtrData ~ filtr", filtr)
  }

  return (
    <>
      <div className="viewgrid">
        <form onSubmit={handleEditFormSubmit}>
          <table>
            <thead>
              <tr>
                {selected && (
                  <th style={{ width: "7%" }}>Selection Questions</th>
                )}
                <th className="thSubjects" onClick={filterData}>Subject
                  <div className="container">
                    <Filter dataFilter={subjects} onClick={filterData} />
                  </div>

                </th>
                <th>Question</th>
                <th>Choice</th>
                <th>Answer</th>
                <th>Point</th>

                {selected ? "" : <th style={{ width: "18%" }}>Actions</th>}

              </tr>
            </thead>
            <tbody className="classFilter" style={{ position: "relative" }}>

              {questions.map((question, key) => (
                <Fragment key={key}>
                  {editQuestionid === question.id ? (
                    <EditableRow
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                      subjects={subjects}
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
const subjectss = [{ id: 1, name: "hi" }, { id: 2, name: "hello" }, { id: 3, name: "hey" }]
export default Grid;
