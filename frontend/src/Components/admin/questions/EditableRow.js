import React from "react";
import Choices from "../../Choice/Choices";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td className="container">
        <Choices type="checkbox" data={editFormData.id} />
      </td>
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
      <td className="btnEdit">
        <button type="submit" style={{ color: "lime" }}>
          Save
        </button>
        <button
          type="button"
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
