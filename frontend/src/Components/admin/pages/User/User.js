import { height } from "@mui/system";
import React from "react";
import CustumBtns from "../../../Setings/CustomBtns";

export default function User(props) {
  const {
    dataUser,
    readAdd,
    setUserSelected,
    setEditUser,
    removeUser,
  } = props;
  return (
    <>
      <div
        className="user"
        onClick={() => {
          readAdd && setUserSelected(dataUser);
        }}
      >
        <h2 className="nameUsers">{dataUser.fullName}</h2>

        <img style={{ width: "100%", height: "100%" }} src={dataUser.image} />
        <div className="infoUsers">
          Total Point is : {dataUser.point} <br />
          Class is : {dataUser.classUser}
          <br />
          Games Played is : {dataUser.victories + dataUser.losses}
          <div className="line-1"></div>
          <CustumBtns
            stateBts={true}
            readAdd={readAdd}
            singleUser={false}
            updateData={setEditUser}
            deleteData={removeUser}
            id={dataUser.id}
          />

        </div>
      </div>
    </>
  );
}
