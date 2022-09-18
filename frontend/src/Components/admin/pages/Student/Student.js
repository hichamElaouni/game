import React from "react";
import CustumBtns from "../../../Setings/CustomBtns";

export default function Student(props) {
  const { dataStudent, readAdd, setStudentSelected, setEditStudent, removeStudent } = props;
  return (
    <>
      <div className="student" onClick={() => { readAdd ? setStudentSelected(dataStudent) : console.log("edit") }}>
        <h2 className="nameStudents">{dataStudent.fullName}</h2>
        <div className="ImageStudent">
          <div className="backgroundInfo"></div>
          <div className="infoStubents">
            Total Point is : {dataStudent.point} <br />
            Class is : {dataStudent.classStudent}<br />
            Games Played is : {dataStudent.victories + dataStudent.losses}
            <div className="line-1"></div>
            <CustumBtns stateBts={true} readAdd={readAdd}
              singleStudent={false} updateData={setEditStudent}
              deleteData={removeStudent}
              id={dataStudent.id}
              
            />
          </div>
        </div>
      </div>
    </>
  );
}
