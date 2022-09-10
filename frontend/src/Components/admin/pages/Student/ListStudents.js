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
  const [newDataStudent, setNewDataStudent] = useState({
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

  })
  useEffect(() => {
    getStudents(setStudents);
  }, []);

  const getInfoStudent = async (event) => {
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...newDataStudent };
    newFormData[fieldName] = fieldValue;

    setNewDataStudent(newFormData);

    console.log("🚀 ~ file: ListStudents.js ~ line 53 ~ addStudent ~ newDataStudent", newDataStudent)
  }

  const addNewStudent = async () => {
    NotificationManager.success(
      "succufully Editing",
      "Question updated ",
      3000, await addStudent(newDataStudent)
    );

    setReadAdd(true)


  }

  return (
    <>
      <div className="boxs">
        <div className="Boxstudent">
          <div className="imgsingel"></div>
          {readAdd ? <StudentReadOnly /> : <AddStudent getInfoStudent={getInfoStudent} />}

          <div className="btnAdd" style={{ right: "2%" }}>
            <CustomBtns stateBts={true} singleStudent={true} readAdd={readAdd} setReadAdd={setReadAdd} saveClick={addNewStudent} />

          </div>
        </div>
        <div className="Boxfilter">
          <FilterStudents />
        </div>
        <div className="ListStudents">
          {students.map((dataStudent, key) => (
            <Fragment key={key}>
              <Student dataStudent={dataStudent} readAdd={readAdd} />
            </Fragment>
          ))}
        </div>
      </div>
      <NotificationContainer />
    </>
  );
}
