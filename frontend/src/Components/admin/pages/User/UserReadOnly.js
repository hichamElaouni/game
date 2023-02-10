import React, { useRef } from "react";
import FildPassword from "../../../Setings/FildPassword";

export default function UserReadOnly(props) {
  const { userSelected, showHistory } = props;
  const refPassword = useRef();

  const generateField = (options = {}) => {
    const { title = "text", data = null, refPassword } = options;
    if (!data || data === "") return (<></>)
    const hasPassword = refPassword ?
      <FildPassword refPassword={refPassword} title={data} />
      : <h3>{data}</h3>

    return (
      <div className="titlebox" >
        <h2>{title}</h2>
        {hasPassword}
      </div>
    )
  }
  /*
  [
    {
      title
      options
    }
  ]
  */

  const fields = [
    {
      title: "Email",
      data: userSelected.email,
    },
    // {
    //   title: "Password",
    //   data: userSelected.password,
    //   refPassword
    // },
    {
      title: "Adress",
      data: userSelected.adress,
    },

    {
      title: "Telephone",
      data: userSelected.telephone,
    },
    {
      title: "Date Born",
      data: userSelected.dateBorn,
    },
    {
      title: "Class",
      data: userSelected.classUser,
    },
    {
      title: "Point",
      data: userSelected.point,
    }, {
      title: "Victories",
      data: userSelected.victories,
    }, {
      title: "Losses",
      data: userSelected.losses,
    },

  ]
  return (
    <>
      <div className="textBox">
        <div
          className="titlebox"
          id={userSelected.id}
          style={{ cursor: "pointer" }}
          onClick={(event) => showHistory(event)}
        >
          <h2>Full Name</h2>
          <h3>{userSelected.fullName}</h3>
        </div>
        {fields.map((field) => generateField(field))}

      </div>
    </>
  );
}
