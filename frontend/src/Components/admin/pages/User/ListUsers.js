import React, { Fragment, useEffect, useRef, useState } from "react";
import User from "./User";
import History from "./History";

import "./Users.css";
import CustomBtns from "../../../Setings/CustomBtns";
import {
  NotificationManager
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import UserReadOnly from "./UserReadOnly";
import AddUser from "./AddUser";

import Pagination from '../../../Setings/Pagination'

import {
  getAllUsers,
  deleteUser,
  updateUser,
  addUser
} from "../../../service/api";

const getUsers = async (setUsers, setUserSelected, refLengthTable, refLimit, refPage) => {
  const {
    data: { data, success, lengthTable },
  } = await getAllUsers(refLimit.current, refPage.current);
  if (!success) console.log("error data");
  else {
    setUsers(data);
    refLengthTable.current = (lengthTable / refLimit.current);
    if (data && Array.isArray(data) && data.length > 0)
      setUserSelected(data[0]);
  }
};

export default function ListUsers() {
  const [users, setUsers] = useState([]);
  const [readAdd, setReadAdd] = useState(true);
  const [edit, setEdit] = useState(true);
  const [history, setHistory] = useState(false);
  const IdUser = useRef(0);


  const initialStateUser = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    telephone: "",
    adress: "",
    dateBorn: "",
    classUser: "",
    losses: 0,
    victories: 0,
    point: 0,
  };
  const [newDataUser, setNewDataUser] = useState(initialStateUser);
  const [userSelected, setUserSelected] = useState(initialStateUser);

  const [numPage, setNumPage] = useState(1);
  const refLengthTable = useRef(0);

  const refLimit = useRef(25);
  const refPage = useRef(1);

  useEffect(() => {
    getUsers(setUsers, setUserSelected, refLengthTable, refLimit, refPage);
  }, [numPage]);

  const getInfoUser = (event) => {
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...newDataUser };
    newFormData[fieldName] = fieldValue;

    setNewDataUser(newFormData);
  };

  const cancelData = () => {
    setReadAdd(true);
    setEdit(true);
  };

  const addNewUser = async () => {
    if (newDataUser.email.match("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$")) {
      if (
        newDataUser.password.match(
          "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$"
        )
      ) {
        const { data } = await addUser(newDataUser);
        if (data.success) {
          NotificationManager.success(
            "Add",
            "successfully Added User",
            3000
          );
          setReadAdd(true);
          setUsers([...users, newDataUser]);

        } else {
          NotificationManager.warning(data.message, "Warning", 3000);
        }
      } else {
        NotificationManager.warning(
          "password not correct.Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters ",
          "Warning",
          5000
        );
      }
    } else {
      NotificationManager.warning("Warning", "Email Not Correct", 3000);
    }
  };

  const setCompAddUser = () => {
    setReadAdd(false);
    setUserSelected(initialStateUser);
  };

  const setEditUser = async (event) => {
    setEdit(false);

    const indexSelected = users.findIndex((user) => user.id === parseInt(event.currentTarget.id))
    setNewDataUser(users[indexSelected]);
  };

  const saveUpdateUser = async (event) => {


    NotificationManager.success(
      " succufully  Updated ",
      "info",
      3000,
      await updateUser(userSelected.id, newDataUser)
    );
    setEdit(true);

    setUserSelected(newDataUser);
    const indexSelected = users.findIndex((user) => user.email === userSelected.email)
    users[indexSelected] = newDataUser;

  };

  const removeUser = async (event) => {
    const userId = event.currentTarget.id;
    NotificationManager.success(
      " succufully  deleted ",
      "info",
      3000,
      await deleteUser(userId)
    );
    setNumPage(Math.random());
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

  const nextPage = async (event) => {
    refPage.current = event.target.textContent;
    await getUsers(setUsers, setUserSelected, refLengthTable, refLimit, refPage);
  }

  const limitData = async (event) => {
    refLimit.current = event.target.value;
    await getUsers(setUsers, setUserSelected, refLengthTable, refLimit, refPage);

  }


  return (
    <>
      <div className="boxs">
        <div className="Boxuser">
          <img className="imgsingel" src={userSelected.image} />
          {readAdd & edit ? (
            <UserReadOnly
              userSelected={userSelected}
              showHistory={showHistory}
            />
          ) : (
            <AddUser
              getInfoUser={getInfoUser}
              userSelected={userSelected}
            />
          )}

          <div className="btnAdd" >
            <CustomBtns
              stateBts={true}
              singleUser={true}
              readAdd={readAdd}
              setReadAdd={setReadAdd}
              setCompAddUser={setCompAddUser}
              saveData={edit ? addNewUser : saveUpdateUser}
              edit={edit}
              cancelData={cancelData}
            />
          </div>
        </div>
        <div className="Boxfilter">
          {/* <FilterUsers /> */}
        </div>
        <div className="ListUsers">
          {users.map((dataUser, key) => (
            <Fragment key={key}>
              <User
                dataUser={dataUser}
                readAdd={readAdd}
                setUserSelected={setUserSelected}
                setEditUser={setEditUser}
                removeUser={removeUser}
                saveUpdateUser={saveUpdateUser}
              />
            </Fragment>
          ))}
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
          <History
            User={userSelected}
          />
        </div>
      )}
      {/* <Pagination lengthPages={lengthTable} onclick={nextPage} /> */}

      <Pagination lengthPages={refLengthTable.current} onclick={nextPage} onchange={limitData} />


    </>
  );
}
