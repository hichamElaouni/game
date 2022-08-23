import React, { useState } from "react";
import Grid from "../../questions/Grid";
import CustumCombobox from "../../../Setings/CustumCombobox";
import { addRoom, getAllRooms, addQuestionsRoom } from "../../../service/api";
import IconButton from "@material-ui/core/IconButton";
import Add from "@material-ui/icons/Add";
import NumberPicker from "react-widgets/NumberPicker";

export default function FormAddRoom(props) {
  const {
    setAdding,
    setTitlePage,
    Data,
    NotificationManager,
    token,
    setToken,
  } = props;
  const [questions, setQuestions] = useState([]);
  const [questionsSelected, setQuestionsSelected] = useState([]);

  const [point, setPoint] = useState(2);
  const [timeRoom, setTimeRoom] = useState(15);
  const [nameRoom, setNameRoom] = useState();

  const ConfirmAdd = async (event) => {
    if (nameRoom === undefined) {
      NotificationManager.warning(" enter Name Room ", "warning", 3000);
    } else {
      if (questionsSelected.length <= 0) {
        NotificationManager.warning(
          " Please select the questions, you still need to selected = " +
            (10 - questionsSelected.length),
          "warning",
          3000
        );
      } else {
        let Room = {
          nameRoom: nameRoom,
          token: token,
          point: point,
          TimeTurn: timeRoom,
          idGame: 1,
        };

        NotificationManager.info(
          " succufully  Adding ",
          "info",
          3000,
          await addRoom({ rooms: Room, questionsSelected })
        );

        setToken(135241654);
        setAdding(false);
        setTitlePage("Rooms");
        setQuestionsSelected([]);
      }
    }
  };

  const getQuestionsSelected = (event) => {
    let data = questionsSelected;
    const value = event.target.value;
    if (event.target.checked) {
      data.push(value);
    } else {
      const index = data.indexOf(value);
      data.splice(index, 1);
    }
    setQuestionsSelected(data);
  };

  return (
    <>
      <div className="div-selections">
        <div className="contant-add">
          <label>Name Room</label>
          <input
            type="text"
            id="txtName"
            className="Name-Room"
            placeholder="Name Room ..."
            required
            onChange={(event) => {
              setNameRoom(event.target.value);
            }}
          />
        </div>
        <div className="contant-add">
          <label>Time</label>
          <NumberPicker
            defaultValue={10}
            step={10}
            onChange={(event) => {
              setTimeRoom(event);
            }}
          />
        </div>
        <div className="contant-add">
          <label>Point</label>
          <NumberPicker
            defaultValue={2}
            step={1}
            onChange={(event) => {
              setPoint(event);
            }}
          />
        </div>
        <div className="contant-add">
          <label>Game</label>
          <CustumCombobox data={Data} stat={true} />
        </div>
      </div>
      <div className="div-grid">
        <Grid
          questions={questions}
          setQuestions={setQuestions}
          getselectedQuestions={(event) => getQuestionsSelected(event)}
          selected={true}
        />
      </div>

      <div className="btnAdd" style={{ right: "8%", bottom: "7%" }}>
        <IconButton
          aria-label="Add"
          style={{
            color: "rgb(25, 74, 93)",
            background: "rgba(58, 239, 51, 0.87)",
          }}
        >
          <Add onClick={ConfirmAdd} />
        </IconButton>
      </div>
    </>
  );
}
