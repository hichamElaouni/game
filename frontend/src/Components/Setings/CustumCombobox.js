import react, { Fragment, useState } from "react";
import Combobox from "react-widgets/Combobox";
import NumberPicker from "react-widgets/NumberPicker";

export default function Example(props) {
  const { data, title, stat } = props;
  return (
    <>
      {stat ? (
        <Combobox
          disabled
          hideCaret
          hideEmptyPopup
          data={data}
          dataKey="id"
          textField="name"
          defaultValue={1}
        />
      ) : (
        <Combobox
          hideCaret
          hideEmptyPopup
          data={data}
          dataKey="id"
          textField="name"
          defaultValue={1}
        />
      )}
    </>
  );
}
