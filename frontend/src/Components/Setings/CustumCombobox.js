import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function CustumCombobox(props) {
  const { title, data } = props;

  return (
    <Autocomplete
      style={{
        width: "150px",
        border: "1px solid black",
        borderRadius: "5px",
        borderTop: " none",
        background: "white",
      }}
      id="combo-box-demo"
      options={data}
      getOptionLabel={(option) => option}
      renderInput={(params) => (
        <TextField {...params} label={title} variant="outlined" />
      )}
    />
  );
}
