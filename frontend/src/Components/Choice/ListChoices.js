import React, { Fragment } from "react";
import Choices from "./Choices";

export default function ListChoices({ choice = [], onclick }) {
  return choice.map((choice, index) => (
    <>
      <Fragment>
        <Choices
          key={index}
          type="radio"
          data={choice}
          value={index + 1}
          onclick={onclick}
          newStyle=""
        />
      </Fragment>
    </>
  ));
}
