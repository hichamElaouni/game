import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function AddUser(props) {
  const { getInfoUser, userSelected } = props;
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
            defaultValue={userSelected.fullName}
            onChange={(event) => {
              getInfoUser(event);
            }}
          ></input>
        </div>
        <div className="titlebox" style={{ width: "70%" }}>
          <h2>Email</h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            defaultValue={userSelected.email}
            onChange={(event) => {
              getInfoUser(event);
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
            defaultValue={userSelected.password}
            onChange={(event) => {
              getInfoUser(event);
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
            defaultValue={userSelected.adress}
            onChange={(event) => {
              getInfoUser(event);
            }}
          />
        </div>
        <div className="titlebox" style={{ width: "70%" }}>
          <h2>Telephone</h2>
          <input
            type="text"
            name="telephone"
            placeholder="Telephone"
            defaultValue={userSelected.telephone}
            onChange={(event) => {
              getInfoUser(event);
            }}
          />
        </div>
        <div className="titlebox" style={{ width: "70%" }}>
          <h2>Date Born</h2>
          <input
            type="Date"
            name="dateBorn"
            placeholder="Date  Born"
            defaultValue={userSelected.dateBorn}
            onChange={(event) => {
              getInfoUser(event);
            }}
          />
        </div>
        <div className="titlebox" style={{ width: "70%" }}>
          <h2>Class</h2>
          <input
            type="text"
            name="classUser"
            placeholder="Class"
            defaultValue={userSelected.classUser}
            onChange={(event) => {
              getInfoUser(event);
            }}
          />
        </div>
      </div>
    </>
  );
}
