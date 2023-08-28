import { Fragment } from "react";

export default function UserReadOnly(props) {
  const { userSelected, showHistory } = props;

  const generateField = (options) => {
    const { title = "text", data = null } = options;

    if (data == undefined || data === "" || data === 0) return <></>;
    const hasPassword = <h3>{data}</h3>;

    return (
      <div
        className="titlebox"
        style={title === "Role" ? { position: "absolute" } : {}}
      >
        <h2>{title}</h2>
        {hasPassword}
      </div>
    );
  };
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
      title: "Role",
      data:
        parseInt(userSelected.role_id) === 1
          ? "Admin"
          : parseInt(userSelected.role_id) === 2
          ? "Teacher"
          : "Student",
    },
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
      title: "Coins",
      data: userSelected.coins,
    },
    {
      title: "Point",
      data: userSelected.point,
    },
    {
      title: "Victories",
      data: userSelected.victories,
    },
    {
      title: "Losses",
      data: userSelected.losses,
    },
  ];
  return (
    <>
      <div className="textBox">
        <div
          className="titlebox"
          id={userSelected.id}
          style={{ cursor: "pointer", marginTop: "2.7rem" }}
          onClick={(event) => showHistory(event)}
        >
          <h2>Full Name</h2>
          <h3>
            {userSelected.first_name} {userSelected.last_name}
          </h3>
        </div>
        {fields.map((field, key) => (
          <Fragment key={key}> {generateField(field)}</Fragment>
        ))}
      </div>
    </>
  );
}
