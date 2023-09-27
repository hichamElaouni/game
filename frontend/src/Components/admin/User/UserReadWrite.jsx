import { Fragment } from "react";
import Filds from "./Filds";

export default function UserReadWrite(props) {
  const { user, role_id, showHistory, edit, getDataUser } = props;

  const fields = [
    {
      title: "Role",
      name: "role_Id",
      role: role_id,
      defaultValue:
        parseInt(user.role_id) == 1
          ? "Admin"
          : parseInt(user.role_id) == 2
            ? "Teacher"
            : "Student",
    },
    edit ?
      {
        title: "Full Name",
        name: "fullName",
        defaultValue: user.first_name + " " + user.last_name,
        id: user.id,
        style: { cursor: "pointer" },
        showHistory: showHistory,
      } :
      {
        title: "last Name",
        name: "last_name",
        defaultValue: user.last_name,
      },
    !edit ? {
      title: "First Name",
      name: "first_name",
      defaultValue: user.first_name,
    } : {},
    {
      title: "Email",
      name: "email",
      defaultValue: user.email,
    },
    {
      title: "Password",
      name: "password",
      defaultValue: "",
    }, {
      title: "Class",
      name: "classUser",
      defaultValue: user.classUser,
    },
    // {
    //   title: "Adress",
    //   name: "address",
    //   defaultValue: user.adress,
    // },
    // {
    //   title: "Telephone",
    //   name: "telephone",
    //   defaultValue: user.telephone,
    // },
    // {
    //   title: "Date Born",
    //   name: "date",
    //   defaultValue: user.dateBorn,
    // },

    // {
    //   title: "Coins",
    //   name: "coins",
    //   defaultValue: user.coins,
    // },
    // {
    //   title: "Point",
    //   name: "point",
    //   defaultValue: user.point,
    // },
    // {
    //   title: "Victories",
    //   name: "victories",
    //   defaultValue: user.victories,
    // },
    // {
    //   title: "Losses",
    //   name: "losses",
    //   defaultValue: user.losses,
    // },
  ];



  return (
    <>
      <div className="filds">
        {fields.map((field, key) => (
          <Fragment key={key}>
            <Filds
              id={field.id}
              title={field.title}
              defaultValue={field.defaultValue}
              role={field.role}
              name={field.name}
              style={field.style}
              showHistory={field.showHistory}
              getDataUser={getDataUser}
              type={edit}
            />
          </Fragment>
        ))}
      </div>

      <img src={user.image} />
    </>
  );
}
