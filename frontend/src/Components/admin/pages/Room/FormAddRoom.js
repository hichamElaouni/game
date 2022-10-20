import React, { useState, useEffect, useRef } from "react";
import Grid from "../../questions/Grid";
import CustumCombobox from "../../../Setings/CustumCombobox";
import { addRoom, getAllQUestions } from "../../../service/api";
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

  const refPoint = useRef(2);
  const refTimeRoom = useRef(15);
  const refName = useRef();
  const refLimitQuestions = 4;

  const getQuestions = async (setQuestions) => {
    const {
      data: { data, success },
    } = await getAllQUestions();
    if (!success) console.log("error data");
    else {
      setQuestions(data);
    }
  };

  useEffect(() => {
    getQuestions(setQuestions);
    refName.current.focus();
  }, []);

  const ConfirmAdd = async () => {
    if (refName.current.value === "") {
      NotificationManager.warning(" enter Name Room ", "warning", 3000);
    } else {
      if (questionsSelected.length <= refLimitQuestions) {
        console.log(
          "🚀 ~ file: FormAddRoom.js ~ line 47 ~ ConfirmAdd ~ refLimitQuestions",
          refLimitQuestions
        );
        NotificationManager.warning(
          " Please select the questions, you still need to selected = " +
            (refLimitQuestions - questionsSelected.length),
          "warning",
          3000
        );
      } else {
        let Room = {
          nameRoom: refName.current.value,
          token: token,
          point: refPoint.current.value,
          TimeTurn: refTimeRoom.current.value,
          idGame: 1,
        };

        NotificationManager.success(
          " succufully  Adding ",
          "info",
          3000,
          await addRoom({ rooms: Room, questionsSelected })
        );

        setToken(123456789);

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
            ref={refName}
            type="text"
            id="txtName"
            className="Name-Room"
            placeholder="Name Room ..."
            required
          />
        </div>
        <div className="contant-add">
          <label>Time</label>
          <NumberPicker defaultValue={10} step={10} ref={refTimeRoom} />
        </div>
        <div className="contant-add">
          <label>Point</label>
          <NumberPicker defaultValue={2} step={1} ref={refPoint} />
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

      <div
        className="btnAdd"
        style={{ right: "5%", bottom: "6%" }}
        onClick={ConfirmAdd}
      >
        <IconButton
          aria-label="Add"
          style={{
            color: "rgb(25, 74, 93)",
            background: "rgba(58, 239, 51, 0.87)",
          }}
        >
          <Add />
        </IconButton>
      </div>
    </>
  );
}
