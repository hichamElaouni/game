import React from "react";

export default function Student({ title, point, classStudent }) {
  return (
    <div className="student">
      <div className="titlename">
        <h3>{title}</h3>
      </div>
      <div className="ImageStudent">
        <div className="backgroundInfo"></div>
        <p className="info">
          point is {point} <br />
          classStudent is {classStudent}
        </p>
      </div>
    </div>
  );
}
