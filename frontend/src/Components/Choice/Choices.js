import React from "react";

export default function Choices(props) {
  const { data, value, type, onclick } = props;

  return (
    <label className="option_item ">
      <input
        name="Answers"
        type={type}
        className="checkbox"
        value={value}
        onChange={onclick}
      />

      <div className="option_inner ansewers">
        <div className="tickmark"></div>
        <div className="name">
          <span>{data}</span>
        </div>
      </div>
    </label>
  );
}
