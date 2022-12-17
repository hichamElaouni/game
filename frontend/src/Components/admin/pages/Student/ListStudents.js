import React, { Fragment, useEffect, useRef, useState } from "react";
import Student from "./Student";
import History from "./History";

import "./Students.css";
import CustomBtns from "../../../Setings/CustomBtns";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import StudentReadOnly from "./StudentReadOnly";
import AddStudent from "./AddStudent";
import FilterStudents from "./FilterStudents";
import Pagination from '../../../Setings/Pagination'

import {
  getAllStudents,
  deleteStudent,
  updateStudent,
  addStudent
} from "../../../service/api";

const getStudents = async (setStudents, setStudentSelected, setLengthTable, page) => {
  const {
    data: { data, success, lengthTable },
  } = await getAllStudents(page);
  if (!success) console.log("error data");
  else {
    setStudents(data);
    setLengthTable(lengthTable / 10);
    if (data && Array.isArray(data) && data.length > 0)
      setStudentSelected(data[0]);
  }
};

export default function ListStudents() {
  const [students, setStudents] = useState([]);
  const [readAdd, setReadAdd] = useState(true);
  const [edit, setEdit] = useState(true);
  const [history, setHistory] = useState(false);
  const IdStudent = useRef(0);


  const initialStateStudent = {
    fullName: "",
    email: "",
    password: "",
    telephone: "",
    adress: "",
    dateBorn: "",
    classStudent: "",
    losses: 0,
    victories: 0,
    point: 0,
  };
  const [newDataStudent, setNewDataStudent] = useState(initialStateStudent);
  const [studentSelected, setStudentSelected] = useState(initialStateStudent);

  const [numPage, setNumPage] = useState(1);
  const [lengthTable, setLengthTable] = useState(0);

  useEffect(() => {
    getStudents(setStudents, setStudentSelected, setLengthTable);
  }, [numPage]);

  const getInfoStudent = (event) => {
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...newDataStudent };
    newFormData[fieldName] = fieldValue;

    setNewDataStudent(newFormData);
  };

  const cancelData = () => {
    setReadAdd(true);
    setEdit(true);
  };

  const addNewStudent = async () => {
    if (newDataStudent.email.match("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$")) {
      if (
        newDataStudent.password.match(
          "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$"
        )
      ) {
        const { data } = await addStudent(newDataStudent);
        if (data.success) {
          NotificationManager.success(
            "Add",
            "successfully Added Student",
            3000
          );
          setReadAdd(true);
          setStudents([...students, newDataStudent]);

        } else {
          NotificationManager.warning(data.message, "Warning", 3000);
        }
      } else {
        NotificationManager.warning(
          "password not correct.Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters ",
          "Warning",
          5000
        );
      }
    } else {
      NotificationManager.warning("Warning", "Email Not Correct", 3000);
    }
  };

  const setCompAddStudent = () => {
    setReadAdd(false);
    setStudentSelected(initialStateStudent);
  };

  const setEditStudent = async (event) => {
    setEdit(false);

    const indexSelected = students.findIndex((student) => student.id === parseInt(event.currentTarget.id))
    setNewDataStudent(students[indexSelected]);
  };

  const saveUpdateStudent = async (event) => {


    NotificationManager.success(
      " succufully  Updated ",
      "info",
      3000,
      await updateStudent(studentSelected.id, newDataStudent)
    );
    setEdit(true);

    setStudentSelected(newDataStudent);
    const indexSelected = students.findIndex((student) => student.email === studentSelected.email)
    students[indexSelected] = newDataStudent;

  };

  const removeStudent = async (event) => {
    const studentId = event.currentTarget.id;
    NotificationManager.success(
      " succufully  deleted ",
      "info",
      3000,
      await deleteStudent(studentId)
    );
    setNumPage(Math.random());
  };
  const showHistory = (event) => {
    IdStudent.current = event.currentTarget.id;

    if (!!IdStudent.current) {
      setHistory(true);
    }
  };

  const escPress = (event) => {
    if (event.keyCode === 27) {
      setHistory(false);
    }
  };

  const nextPage = async (event) => {
    await getStudents(setStudents, setStudentSelected, setLengthTable, event.target.textContent);
  }

  return (
    <>
      <div className="boxs">
        <div className="Boxstudent">
          <div className="imgsingel"></div>
          {readAdd & edit ? (
            <StudentReadOnly
              studentSelected={studentSelected}
              showHistory={showHistory}
            />
          ) : (
            <AddStudent
              getInfoStudent={getInfoStudent}
              studentSelected={studentSelected}
            />
          )}

          <div className="btnAdd" style={{ right: "2%" }}>
            <CustomBtns
              stateBts={true}
              singleStudent={true}
              readAdd={readAdd}
              setReadAdd={setReadAdd}
              setCompAddStudent={setCompAddStudent}
              saveData={edit ? addNewStudent : saveUpdateStudent}
              edit={edit}
              cancelData={cancelData}
            />
          </div>
        </div>
        <div className="Boxfilter">
          <FilterStudents />
        </div>
        <div className="ListStudents">
          {students.map((dataStudent, key) => (
            <Fragment key={key}>
              <Student
                dataStudent={dataStudent}
                readAdd={readAdd}
                setStudentSelected={setStudentSelected}
                setEditStudent={setEditStudent}
                removeStudent={removeStudent}
                saveUpdateStudent={saveUpdateStudent}
              />
            </Fragment>
          ))}
        </div>
      </div>
      {history && (
        <div
          className="div-History"
          style={{ height: "100vh", gap: "5px", top: "auto" }}
          tabIndex={0}
          onKeyDown={(event) => {
            escPress(event);
          }}
        >
          <History
            Student={studentSelected}
          />
        </div>
      )}
      <Pagination lengthPages={Math.ceil(lengthTable)} nextPage={nextPage} />
      <NotificationContainer />
    </>
  );
}
