import React from "react";
import Choices from "./Choices";

export default function ListChoices({ choice = [], onclick }) {
  return choice.map((choice, index) => (
    <>
      <Choices
        key={index}
        type="radio"
        data={choice}
        value={index + 1}
        onclick={onclick}
        newStyle=""
      />
    </>
  ));
}
