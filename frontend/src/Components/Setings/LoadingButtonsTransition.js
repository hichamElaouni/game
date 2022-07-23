import * as React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";

export default function LoadingButtonsTransition() {
  const [loading, setLoading] = React.useState(true);
  function handleClick() {
    setLoading(true);
  }

  return (
    <Box>
      <Box sx={{ "& > button": { m: 1 }, color: "white" }}>
        Waiting ...{" "}
        <LoadingButton onClick={handleClick} loading={loading} disabled>
          disabled
        </LoadingButton>
      </Box>
    </Box>
  );
}
