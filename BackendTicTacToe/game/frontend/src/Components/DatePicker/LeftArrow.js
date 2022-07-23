import * as React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
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

const subtractDayToDate = (currentDate, upDate, type = "day") =>
  upDate([
    moment(currentDate[0]).subtract(1, type),
    moment(currentDate[1]).subtract(1, type),
  ]);

const LeftArrow = ({ currentDate, upDate, type, fill = '"#ffffff"' }) => {
  return (
    <ThemeProvider theme={theme}>
      <IconButton
        style={{ marginTop: "1vh" }}
        onClick={() => subtractDayToDate(currentDate, upDate, type)}
      >
        <ArrowBackIosIcon style={{ fill }} />
      </IconButton>
    </ThemeProvider>
  );
};

export default LeftArrow;
