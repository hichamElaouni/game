import react, { Fragment, useState } from "react";
import Combobox from "react-widgets/Combobox";
import NumberPicker from "react-widgets/NumberPicker";
let games = [{ id: 1, name: "Tic tac toe" }];

export default function Example(props) {
  return (
    <>
      <Combobox
        hideCaret
        hideEmptyPopup
        data={games}
        dataKey="id"
        textField="name"
        defaultValue={1}
      />
      <NumberPicker defaultValue={10} step={10} />
      <NumberPicker defaultValue={2} step={1} />
    </>
  );
}
