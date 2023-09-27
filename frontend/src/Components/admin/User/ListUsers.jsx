import { useEffect, useRef, useState } from "react";
import { NotificationManager } from "react-notifications";
import {
  getAllUsers,
  deleteUser,
  updateUser,
  addUser,
} from "../../service/api";
import Pagination from "../../Setings/Pagination";
import { EmailCheck, PasswordCheck } from "../../Setings/Controllers";
import "./Users.css";

import Users from "./Users";

import { Delete, Update, Save, Cancel, Add } from "@material-ui/icons";

import History from "./History";
import UserSelected from "./UserSelected";

const getUsers = async (
  setUsers,
  setUserSelected,
  refLengthTable,
  limit,
  page,
  user
) => {
  const {
    data: { data, success, lengthTable },
  } = await getAllUsers(limit, page);
  if (!success) console.log("error data");
  else {
    const result = await data.filter((users) => users.email !== user.email);

    setUsers(result);

    refLengthTable.current = lengthTable / limit;

    if (result && Array.isArray(result) && data.length > 0)
      setUserSelected(result[0]);
  }
};

export default function ListUsers(props) {
  const { userSection } = props;
  const [users, setUsers] = useState([]);
  const [readAdd, setReadAdd] = useState(true);
  const [edit, setEdit] = useState(true);
  const [history, setHistory] = useState(false);

  const IdUser = useRef(0);
  //after finish ideting delete IdUser because refIndex is new version
  const refIndex = useRef(0);

  const initialStateUser = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    classUser: "",
    losses: 0,
    victories: 0,
    point: 0,
    role_id: 3,
  };
  //????
  const [userSelected, setUserSelected] = useState(initialStateUser);
  const refLengthTable = useRef(0);

  const [limit, setLimit] = useState(25);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getUsers(
      setUsers,
      setUserSelected,
      refLengthTable,
      limit,
      page,
      userSection
    );
  }, [limit, page]);

  // const getInfoUser = (event) => {
  //   const fieldName = event.target.getAttribute("name");
  //   const fieldValue = event.target.value;

  //   const newUser = { ...initialStateUser };
  //   newUser[fieldName] = fieldValue;
  //   setUserSelected(newUser);

  // };

  // const setEditUser = async (event) => {
  //   const indexSelected = users.findIndex(
  //     (user) => user.id === parseInt(event.currentTarget.id)
  //   );
  //   userSelected(users[indexSelected]);
  //   setEdit(false);
  // };
  // const cancelData = () => {
  //   setReadAdd(true);
  //   setEdit(true);
  // };

  // const addNewUser = async () => {
  //   if (EmailCheck(newDataUser.email)) {
  //     if (PasswordCheck(newDataUser.password)) {
  //       const { data } = await addUser(newDataUser);
  //       if (data.success) {
  //         NotificationManager.success("Add", "successfully Added User", 3000);
  //         setReadAdd(true);
  //         setUsers([...users, newDataUser]);
  //       } else {
  //         NotificationManager.warning(data.message, "Warning", 3000);
  //       }
  //     } else {
  //       NotificationManager.warning(
  //         "password not correct.Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters ",
  //         "Warning",
  //         5000
  //       );
  //     }
  //   } else {
  //     NotificationManager.warning("Warning", "Email Not Correct", 3000);
  //   }
  // };

  // const saveUpdateUser = async (event) => {
  //   NotificationManager.success(
  //     " succufully  Updated ",
  //     "info",
  //     3000,
  //     await updateUser(userSelected.id, newDataUser)
  //   );
  //   setEdit(true);

  //   setUserSelected(newDataUser);
  //   const indexSelected = users.findIndex(
  //     (user) => user.email === userSelected.email
  //   );
  //   users[indexSelected] = newDataUser;
  // };

  const DeleteUser = async (event) => {
    const userId = event.currentTarget.id;
    const index = users.findIndex(
      (user) => parseInt(user.id) === parseInt(userId)
    );
    const User = users.filter((user) => parseInt(user.id) !== parseInt(userId));
    const confirmed = window.confirm(
      "Are you sure you want to delete this User => " +
      users[index].first_name +
      " " +
      users[index].last_name
    );
    if (confirmed) {
      NotificationManager.success(
        " succufully  deleted ",
        "info",
        3000,
        await deleteUser(userId)
      );
      setUserSelected(users[index]);
      setUsers(User);
    } else {
      cancel();
    }
  };

  const showHistory = (event) => {
    IdUser.current = event.currentTarget.id;

    if (!!IdUser.current) {
      setHistory(true);
    }
  };

  const escPress = (event) => {
    if (event.keyCode === 27) {
      setHistory(false);
    }
  };

  //? ****************************************************************
  //? ****************************************************************
  //? ****************************************************************
  //? ****************************************************************

  const setNewUser = () => {
    setUserSelected(initialStateUser);
    refIndex.current = users.findIndex((user) => user.id === userSelected.id);
    setEdit(false);
  };

  const getDataUser = (event) => {
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newUser = { ...userSelected };
    newUser[fieldName] = fieldValue;
    setUserSelected(newUser);
  };

  const setUpdeteUser = async (event) => {
    const indexSelectedUser = users.findIndex(
      (user) => user.id === parseInt(event.currentTarget.id)
    );
    refIndex.current = indexSelectedUser;
    setUserSelected(users[indexSelectedUser]);
    setEdit(false);
  };

  const cancel = () => {
    setUserSelected(users[refIndex.current]);
    setEdit(true);
  };

  const UpdeteUser = async (event) => {
    NotificationManager.success(
      " succufully  Updated ",
      "info",
      3000,
      await updateUser(userSelected.id, userSelected)
    );
    setEdit(true);
    users[refIndex.current] = userSelected;
  };

  const AddNewUser = async () => {
    if (EmailCheck(userSelected.email))
      if (PasswordCheck(userSelected.password)) {
        const { data } = await addUser(userSelected);
        if (data.success) {
          NotificationManager.success("Add", "successfully Added User", 3000);
          setEdit(true);
          setUsers([...users, userSelected]);
        } else {
          NotificationManager.warning(data.message, "Warning", 3000);
        }
      }
  };

  const btnAdd = [
    {
      aria: "Add",
      color: "#0f2a35",
      background: "rgba(63, 227, 29, 0.94)",
      handclick: setNewUser,
      btn: <Add />,
    },
  ];

  const btnSave_Cancel = [
    {
      aria: "Save",
      color: "whitesmoke",
      background: "#4fcd3596",
      handclick: edit ? AddNewUser : UpdeteUser,
      btn: <Save />,
    },
    {
      aria: "Cancel",
      color: "rgb(224, 93, 69)",
      background: "e5d0d0ab",
      handclick: cancel,
      btn: <Cancel />,
    },
  ];

  const btnDelete_updete = [
    {
      aria: "Delete",
      color: "rgb(224, 93, 69)",
      background: "#e5d0d0ab",
      handclick: DeleteUser,
      btn: <Delete />,
    },
    {
      aria: "updete",
      color: "whitesmoke",
      background: "#4fcd3596",
      handclick: setUpdeteUser,
      btn: <Update />,
    },
  ];

  //? ****************************************************************
  //? ****************************************************************
  //? ****************************************************************

  return (
    <>
      <div className="Users">
        <UserSelected
          user={userSelected}
          role_id={userSection.role_id}
          showHistory={showHistory}
          edit={edit}
          getDataUser={getDataUser}
          lstBtns={edit ? btnAdd : btnSave_Cancel}
        />
        <div className="filterUsers"></div>
        <div className="Boxfilter">{/* <FilterUsers /> */}</div>
        <div className="ListUsers">
          {users.map((user) => (
            <Users
              key={user.email}
              user={user}
              setUserSelected={setUserSelected}
              edit={edit}
              role={userSection.role_id}
              lstBtns={btnDelete_updete}
            />
          ))}
          <Pagination
            lengthPages={refLengthTable.current}
            setPage={setPage}
            setLimit={setLimit}
          />
        </div>
      </div>
      {history && (
        <div
          className="div-History"
          style={{ height: "100vh", gap: "5px", top: "auto" }}
          tabIndex={0}
          onKeyDown={(event) => {
            escPress(event);
          }}
        >
          <History User={userSelected} />
        </div>
      )}
    </>
  );
}
