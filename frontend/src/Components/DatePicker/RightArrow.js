import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import moment from "moment";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
        },
      },
    },
  },
});

const addDayToDate = (currentDate, setDate, type = "day") =>
  setDate([
    moment(currentDate[0]).add(1, type),
    moment(currentDate[1]).add(1, type),
  ]);

const RightArrow = ({ currentDate, downDate, type, fill }) => {
  return (
    <ThemeProvider theme={theme}>
      <IconButton
        style={{ marginTop: "1vh" }}
        onClick={() => {
          addDayToDate(currentDate, downDate, type);
        }}
      >
        <ArrowForwardIosIcon style={{ fill }} />
      </IconButton>
    </ThemeProvider>
  );
};

export default RightArrow;
