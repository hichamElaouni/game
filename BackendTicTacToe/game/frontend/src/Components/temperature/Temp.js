import React from "react";
import Thermometer from "react-thermometer-component";

const styles = {
  dial: {
    height: `auto`,
    color: "#000",
    border: "0.5px solid #fff",
    padding: "2px",
    display: "grid",
    placeItems: "center",
  },
  title: {
    fontSize: "1em",
    color: "#000",
    marginTop: "15px",
  },
};

const Thermo = ({ value, title }) => {
  return (
    <div style={styles.dial}>
      <Thermometer
        theme="light"
        value={value}
        max="100"
        steps="1"
        format="°C"
        size="normal"
        height="180"
      />
      <div style={styles.title}>
        {title}: {value}°C
      </div>
    </div>
  );
};

export default Thermo;
