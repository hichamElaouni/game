import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function AddStudent(props) {
  const { getInfoStudent, studentSelected } = props;
  const [typeInputPassword, setTypeInputPassword] = useState(false);
  return (
    <>
      <div className="textBox" style={{ width: "60%" }}>
        <div className="titlebox" style={{ width: "70%" }}>
          <h2>Full Name </h2>

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            defaultValue={studentSelected.fullName}
            onChange={(event) => {
              getInfoStudent(event);
            }}
          ></input>
        </div>
        <div className="titlebox" style={{ width: "70%" }}>
          <h2>Email</h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            defaultValue={studentSelected.email}
            onChange={(event) => {
              getInfoStudent(event);
            }}
          />
        </div>
        <div
          className="titlebox"
          style={{ width: "70%", position: "relative" }}
        >
          <h2>Password</h2>
          <input
            type={typeInputPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            defaultValue={studentSelected.password}
            onChange={(event) => {
              getInfoStudent(event);
            }}
          />
          {typeInputPassword ? (
            <VisibilityOff
              onClick={() => {
                setTypeInputPassword(false);
              }}
            />
          ) : (
            <Visibility
              onClick={() => {
                setTypeInputPassword(true);
              }}
            />
          )}
        </div>
        <div className="titlebox" style={{ width: "70%" }}>
          <h2>Adress</h2>
          <input
            type="text"
            name="adress"
            placeholder="Adress"
            defaultValue={studentSelected.adress}
            onChange={(event) => {
              getInfoStudent(event);
            }}
          />
        </div>
        <div className="titlebox" style={{ width: "70%" }}>
          <h2>Telephone</h2>
          <input
            type="text"
            name="telephone"
            placeholder="Telephone"
            defaultValue={studentSelected.telephone}
            onChange={(event) => {
              getInfoStudent(event);
            }}
          />
        </div>
        <div className="titlebox" style={{ width: "70%" }}>
          <h2>Date Born</h2>
          <input
            type="Date"
            name="dateBorn"
            placeholder="Date  Born"
            defaultValue={studentSelected.dateBorn}
            onChange={(event) => {
              getInfoStudent(event);
            }}
          />
        </div>
        <div className="titlebox" style={{ width: "70%" }}>
          <h2>Class</h2>
          <input
            type="text"
            name="classStudent"
            placeholder="Class"
            defaultValue={studentSelected.classStudent}
            onChange={(event) => {
              getInfoStudent(event);
            }}
          />
        </div>
      </div>
    </>
  );
}
