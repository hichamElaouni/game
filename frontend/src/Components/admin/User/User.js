import React from "react";
import CustumBtns from "../../Setings/CustomBtns";

export default function User(props) {
  const {
    dataUser,
    readAdd,
    setUserSelected,
    setEditUser,
    removeUser,
    role,
  } = props;
  return (
    <>
      <div
        className="user"
        onClick={() => {
          readAdd && setUserSelected(dataUser);
        }}
      >
        <h2 className="nameUsers">{dataUser.first_name} {dataUser.last_name}</h2>

        <img style={{ width: "100%", height: "100%" }} />
        <div className="infoUsers">
          Total Point is : {dataUser.point} <br />
          Class is : {dataUser.classUser}
          <br />
          Games Played is : {dataUser.victories + dataUser.losses}
          <div className="line-1"></div>
          {
            parseInt(role) === 1 &&
            <CustumBtns
              stateBts={true}
              readAdd={readAdd}
              singleUser={false}
              updateData={setEditUser}
              deleteData={removeUser}
              id={dataUser.id}
            />
          }
        </div>
      </div>
    </>
  );
}
