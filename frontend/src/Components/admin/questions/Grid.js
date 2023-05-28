import React, { useState, Fragment, useRef } from "react";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import { deleteQuestion, updateQuestion } from "../../service/api";

import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import Filter from "./Filter";
import Pagination from "../../Setings/Pagination";

const Grid = (props) => {

  const { questions, setQuestions, getselectedQuestions, selected, subjects, levels, getQuestions, lengthTable, page, limit } = props;

  const [editFormData, setEditFormData] = useState({
    title: "",
    choices: "",
    answer: "",
    point: "",
    idSubject: "",
    nameSubject: "",
  });

  const [editQuestionid, seteditQuestionid] = useState(null);
  const [activeFilterSubject, setActiveFilterSubject] = useState(false);
  const [activeFilterLevel, setActiveFilterLevel] = useState(false);

  const idLevel = useRef(0);
  const idSubject = useRef(0);



  const nextData = async (event) => {
    page.current = event.target.textContent;

    await getQuestions(limit.current, page.current, idSubject.current, idLevel.current)
  }


  const limitData = async (event) => {

    limit.current = event.target.value;
    await getQuestions(limit.current, page.current, idSubject.current, idLevel.current)
  }


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

    if (fieldName.toString() === "idLevel") {
      const levelNumber = subjects[levels.findIndex((level) => level.id === parseInt(fieldValue))].name;
      newFormData["levelNumber"] = levelNumber;
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
      idLevel: editFormData.idLevel,
      levelNumber: editFormData.levelNumber,

    };
    // return Id new question

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

    const levelNumber = levels[levels.findIndex((level) => level.id === parseInt(question.idLevel))].levelNumber;

    const formValues = {
      idSubject: question.idSubject,
      nameSubject: nameSubject,
      idLevel: question.idLevel,
      levelNumber: levelNumber,
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



  const filterSubject = async (event) => {
    if (activeFilterSubject) {
      idSubject.current = parseInt((event.target.value));
      await getQuestions(limit, page, idSubject.current, idLevel.current)
      setActiveFilterSubject(false);
    }
  }

  const filterLevel = async (event) => {
    if (activeFilterLevel) {
      idLevel.current = parseInt((event.target.value));
      await getQuestions(limit, page, idSubject.current, idLevel.current)
      setActiveFilterLevel(false);
    }
  }

  const ActiveFilterLevel = () => {
    if (!activeFilterLevel) { setActiveFilterLevel(true); setActiveFilterSubject(false) }
  }
  const ActiveFilterSubject = () => {
    if (!activeFilterSubject) { setActiveFilterSubject(true); setActiveFilterLevel(false); }
  }

  const escPress = (event) => {
    if (event.keyCode === 27) {
      setActiveFilterLevel(false);
      setActiveFilterSubject(false)
    }
  };


  return (
    <>
      <div className="viewgrid" tabIndex={0}
        onKeyDown={(event) => {
          escPress(event);
        }}>
        <form onSubmit={handleEditFormSubmit}>
          <table>
            <thead>
              <tr>
                {/* //simple more.... */}
                {selected && (
                  <th style={{ width: "7%" }}>Selection Questions</th>
                )}
                <th className="thSubjects" onClick={ActiveFilterLevel}>Classes
                  {activeFilterLevel && <div className="container">
                    <Filter dataFilter={levels} onClick={(event) => filterLevel(event)} />
                  </div>}
                </th>

                <th className="thSubjects" onClick={ActiveFilterSubject}>Subject
                  {activeFilterSubject && <div className="container">
                    <Filter dataFilter={subjects} onClick={(event) => filterSubject(event)} />
                  </div>}

                </th>
                <th>Question</th>
                <th>Choice</th>
                <th>Answer</th>
                <th>Point</th>

                {selected ? "" : <th style={{ width: "18%" }}>Actions</th>}

              </tr>
            </thead>
            <tbody className={`${(activeFilterSubject || activeFilterLevel) && "classFilter"}`} style={{ position: "relative" }}>

              {questions.map((question, key) => (
                <Fragment key={key}>
                  {editQuestionid === question.id ? (
                    <EditableRow
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                      subjects={subjects}
                      levels={levels}
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
      <div className="PaginationQuestion" >

        <Pagination lengthPages={lengthTable / limit.current} onclick={nextData} onchange={limitData} />
      </div>
    </>
  );
};

export default Grid;
