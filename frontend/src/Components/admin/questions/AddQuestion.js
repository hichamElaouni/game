import React from "react";

export default function AddQuestion(props) {
  const { handleAddFormSubmit, handleAddFormChange } = props;
  return (
    <form onSubmit={handleAddFormSubmit}>
      <input
        type="text"
        name="Question"
        required="required"
        placeholder="Enter a Question..."
        onChange={handleAddFormChange}
      />
      <input
        type="text"
        name="Choices"
        required="required"
        placeholder="Enter an Choices..."
        onChange={handleAddFormChange}
      />
      <input
        type="text"
        name="Answer"
        required="required"
        placeholder="Enter a Answer..."
        onChange={handleAddFormChange}
      />
      <input
        type="text"
        name="Point"
        required="required"
        placeholder="Enter Point..."
        onChange={handleAddFormChange}
      />
      <button type="submit" className="btn btn-success">
        Add
      </button>
    </form>
  );
}
