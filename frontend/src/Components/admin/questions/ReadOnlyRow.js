import React from "react";
import Choices from "../../Choice/Choices";

const ReadOnlyRow = ({
  question,
  handleEditClick,
  handleDeleteClick,
  getselectedQuestions,
  selected,
}) => {
  return (
    <tr>
      {selected ? (
        <td className="container FromStudent">
          <Choices
            type="checkbox"
            data={0}
            value={question.id}
            onclick={getselectedQuestions}
          />
        </td>
      ) : (
        ""
      )}
      <td>{question.title}</td>
      <td>{question.choices}</td>
      <td>{question.answer}</td>
      <td>{question.point}</td>
      <td className="trActions">
        <button
          style={{ color: "#8fe88f" }}
          type="button"
          className="btns btnEdidRow"
          onClick={(event) => handleEditClick(event, question)}
        >
          Edit
        </button>
        <button
          type="button"
          className="btns btnDeleteRow"
          style={{ color: "#e07979" }}
          onClick={() => handleDeleteClick(question.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
