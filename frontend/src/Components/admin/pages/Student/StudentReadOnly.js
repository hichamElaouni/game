import React from "react";

export default function StudentReadOnly(props) {
  const { studentSelected } = props;
  return (
    <>
      <div className="textBox">
        <div className="titlebox">
          <h2>Full Name</h2>
          <h3>{studentSelected.fullName}</h3>
        </div>
        <div className="titlebox">
          <h2>Email</h2>
          <h3>{studentSelected.email}</h3>
        </div>
        <div className="titlebox">
          <h2>Password</h2>
          <h3>{studentSelected.password}</h3>
        </div>
        <div className="titlebox">
          <h2>Adress</h2>
          <h3>{studentSelected.adress}</h3>
        </div>
        <div className="titlebox">
          <h2>Telephone</h2>
          <h3>{studentSelected.telephone}</h3>
        </div>
        <div className="titlebox">
          <h2>Date Born</h2>
          <h3>{studentSelected.dateBorn}</h3>
        </div>
        <div className="titlebox">
          <h2>Class</h2>
          <h3>{studentSelected.classStudent}</h3>
        </div>
        <div className="titlebox">
          <h2>Point</h2>
          <h3>{studentSelected.point}</h3>
        </div>
        <div className="titlebox">
          <h2>Victories : </h2>
          <h3>{studentSelected.victories} </h3>
        </div>
        <div className="titlebox">
          <h2>Losses : </h2>
          <h3>{studentSelected.losses} </h3>
        </div>
      </div>
    </>
  );
}
