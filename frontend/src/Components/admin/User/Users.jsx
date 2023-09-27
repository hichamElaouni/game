import React from "react";
import CustomBtns from "../../Setings/CustomBtns1";

export default function Users(props) {
  const {
    user,
    edit,
    lstBtns,
    role,
    setUserSelected,
  } = props;


  return (
    <div
      className="user"
      onClick={() => {
        edit && setUserSelected(user);
      }}
    >
      <h2 className="nameUsers">
        {user.first_name} {user.last_name}
      </h2>

      <img src={user.image} />

      <div className="infoUsers">
        <div>
          Total Point is : {user.point} <br />
          Class is : {user.classUser}
          <br />
          Games Played is : {user.victories + user.losses}
        </div>
        <div className="line-1"></div>

        {parseInt(role) === 1 && <CustomBtns
          lstBtns={lstBtns}
          id={user.id}
        />
        }

      </div>
    </div>
  );
}
