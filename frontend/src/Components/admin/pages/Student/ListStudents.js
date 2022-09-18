import React, { Fragment, useEffect, useState } from "react";
import Student from "./Student";
import "./Students.css";
import CustomBtns from "../../../Setings/CustomBtns";
import { NotificationManager, NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import StudentReadOnly from "./StudentReadOnly";
import AddStudent from "./AddStudent";
import FilterStudents from "./FilterStudents";
import {
  getAllStudents,
  deleteStudent,
  updateStudent,
  addStudent,
} from "../../../service/api";

const getStudents = async (setStudents) => {
  const {
    data: { data, success },
  } = await getAllStudents();
  if (!success) console.log("error data");
  else {
    setStudents(data);
  }
};

export default function ListStudents() {
  const [students, setStudents] = useState([]);
  const [readAdd, setReadAdd] = useState(true);
  const [edit, setEdit] = useState(true);


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
    point: 0
  }
  const [newDataStudent, setNewDataStudent] = useState(initialStateStudent)
  const [refPage, setRefPage] = useState(0)
  const [studentSelected, setStudentSelected] = useState(initialStateStudent)



  useEffect(() => {
    getStudents(setStudents);
  }, [refPage]);

  const getInfoStudent = (event) => {

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...newDataStudent };
    newFormData[fieldName] = fieldValue;

    setNewDataStudent(newFormData);

  }

  const cancelData = () => {
    setReadAdd(true);
    setEdit(true);
  }

  const addNewStudent = async () => {
    NotificationManager.success(
      "succufully Editing",
      "Question updated ",
      3000, await addStudent(newDataStudent)
    );

    setReadAdd(true)
    setRefPage(Math.random());
  }

  const setCompAddStudent = () => {
    setReadAdd(false);
    setStudentSelected(initialStateStudent);
  }

  const setEditStudent = async () => {
    setEdit(false);
    setNewDataStudent(studentSelected);

  }

  const saveUpdateStudent = async (event) => {


    NotificationManager.success(" succufully  Updated ",
      "info",
      3000,
      await updateStudent(studentSelected.id, newDataStudent)
    );
    setEdit(true);
    setRefPage(Math.random());
    setStudentSelected(newDataStudent)
  };

  const removeStudent = async (event) => {
    const studentId = event.currentTarget.id;
    NotificationManager.success(
      " succufully  deleted ",
      "info",
      3000,
      await deleteStudent(studentId)
    );
    setRefPage(Math.random());
  };

  return (
    <>
      <div className="boxs">
        <div className="Boxstudent" >
          <div className="imgsingel"></div>
          {readAdd & edit ? <StudentReadOnly studentSelected={studentSelected} />
            :
            <AddStudent getInfoStudent={getInfoStudent} studentSelected={studentSelected} />}

          <div className="btnAdd" style={{ right: "2%" }}>
            <CustomBtns stateBts={true}
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
            <Fragment key={dataStudent[key]}>

              <Student dataStudent={dataStudent} readAdd={readAdd}
                setStudentSelected={setStudentSelected}
                setEditStudent={setEditStudent}
                removeStudent={removeStudent}
                saveUpdateStudent={saveUpdateStudent}
              />
            </Fragment>
          ))}
        </div>
      </div>
      <NotificationContainer />
    </>
  );
}
