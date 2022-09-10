import React from "react";
import CustumBtns from "../../../Setings/CustomBtns";

export default function Student(props) {
  const { dataStudent, readAdd } = props;
  return (
    <>
      <div className="student">
        <h2 className="nameStudents">{dataStudent.fullName}</h2>
        <div className="ImageStudent">
          <div className="backgroundInfo"></div>
          <div className="infoStubents">
            point is : {dataStudent.point} <br />
            classStudent is : {dataStudent.email}
            <div className="line-1"></div>
            <CustumBtns stateBts={true} readAdd={readAdd} singleStudent={false} />
          </div>
        </div>
      </div>
    </>
  );
}
