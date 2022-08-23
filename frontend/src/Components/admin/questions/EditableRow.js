import React from "react";
import Choices from "../../Choice/Choices";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
  selected,
}) => {
  return (
    <tr>
      {selected ? (
        <td className="container">
          <Choices type="checkbox" data={editFormData.id} />
        </td>
      ) : (
        ""
      )}
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a name..."
          name="title"
          value={editFormData.title}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter an choices..."
          name="choices"
          value={editFormData.choices}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a answer..."
          name="answer"
          value={editFormData.answer}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter an point..."
          name="point"
          value={editFormData.point}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td className="tdEdit">
        <button
          type="submit"
          className="btns btnSaveRow"
          style={{ color: "lime" }}
        >
          Save
        </button>
        <button
          type="button"
          className="btns btnCancelRow"
          style={{ color: "#ffa2a2" }}
          onClick={handleCancelClick}
        >
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
