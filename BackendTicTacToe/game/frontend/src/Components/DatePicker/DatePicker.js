import * as React from "react";
import TextField from "@mui/material/TextField";
import DateRangePicker from "@mui/lab/DateRangePicker";
import Box from "@mui/material/Box";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import LeftArrow from "./LeftArrow";
import RightArrow from "./RightArrow";

const DatePickerComponent = (props) => {
  const {
    date = new Date(),
    setDate,
    type,
    className = "date-picker-title",
    fill = "#ffffff",
    disabled = false,
    style,
  } = props;

  return (
    <div style={{ float: "right", ...style }}>
      <ul className="card-container" style={{ width: "100%" }}>
        <li style={{ margin: 0 }}>
          <LeftArrow
            currentDate={date}
            upDate={setDate}
            type={type}
            fill={fill}
          />
        </li>
        <li className={className}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker
              startText="Depuis"
              endText="Jusqu'à"
              showTodayButton={true}
              disableFuture
              disabled={disabled}
              label="Temps"
              dateDetails
              disableCloseOnSelect={false}
              value={date}
              inputFormat={"yyyy-MM-dd"}
              onChange={(newValue) => setDate(newValue)}
              renderInput={(startProps, endProps) => (
                <React.Fragment>
                  <TextField {...startProps} />
                  <Box sx={{ mx: 2 }}> à </Box>
                  <TextField {...endProps} />
                </React.Fragment>
              )}
            />
          </LocalizationProvider>
        </li>
        <li style={{ float: "right", margin: 0 }}>
          <div>
            <RightArrow
              currentDate={date}
              downDate={setDate}
              type={type}
              fill={fill}
            />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default DatePickerComponent;
