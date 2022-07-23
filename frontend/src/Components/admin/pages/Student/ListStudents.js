import React from "react";
import Student from "./Student";
import "./Students.css";
import Data from "./DataStudents.json";
import FilterStudents from "./FilterStudents";

export default function ListStudents() {
  return (
    <>
      <div className="boxs">
        <div className="Boxstudent">
          <div className="imgsingel"></div>
          <div className="textBox">
            <div className="titlebox">
              <h2>Full Name Student</h2>
              <h3>{Data[0].FullNameStudent}</h3>
            </div>
            <div className="titlebox">
              <h2>point</h2>
              <h3>{Data[0].point}</h3>
            </div>

            <div className="titlebox">
              <h2>class Student</h2>
              <h3>{Data[0].classStudent}</h3>
            </div>

            <div className="titlebox">
              <h2>email</h2>
              <h3>{Data[0].email}</h3>
            </div>
          </div>
        </div>
        <div className="Boxfilter">
          <FilterStudents />
        </div>
        <div className="ListStudents">
          {Data.map((dataStudent) => (
            <Student
              title={dataStudent.FullNameStudent}
              point={dataStudent.point}
              classStudent={dataStudent.classStudent}
            />
          ))}
        </div>
      </div>
    </>
  );
}
