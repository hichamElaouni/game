import CustemSelect from "../../Setings/CustemSelect";

export default function ApdateUser(props) {
  const { getInfoUser, userSelected } = props;

  const users = [
    {
      title: "Roles",
      name: "role_Id",
      defaultValue: userSelected.role_id,
    },
    {
      title: "Last Name",
      name: "last_name",
      defaultValue: userSelected.last_name,
    },
    {
      title: "First Name",
      name: "first_name",
      defaultValue: userSelected.first_name,
    },
    {
      title: "Email",
      name: "email",
      defaultValue: userSelected.email,
    },
    !userSelected.password && {
      title: "Password",
      name: "password",
      defaultValue: userSelected.password,
    },
    // {
    //   title: "Address",
    //   name: "address",
    //   defaultValue: userSelected.adress,
    // },
    // {
    //   title: "Telephone",
    //   name: "telephone",
    //   defaultValue: userSelected.telephone,
    // },
    {
      title: "Class",
      name: "class",
      defaultValue: userSelected.classUser,
    },
  ];

  return (
    <div className="textBox">
      {users.map((user, key) => (
        <div className="fildsUser" key={key}>
          <h2>{user.title}</h2>
          {user.name === "role_Id" ? (
            <CustemSelect
              defaultValue={user.defaultValue}
              name={user.name}
              onchange={getInfoUser}
            />
          ) : (
            <input
              type={user.name === "email" ? "email" : "text"}
              placeholder={user.placeholder}
              name={user.name}
              disabled={user.defaultValue !== "" ? user.name === "email" : null}
              defaultValue={user.defaultValue}
              onChange={(event) => {
                getInfoUser(event);
              }}
            ></input>
          )}
        </div>
      ))}
    </div>
  );
}
