import React, { useState } from "react";
import LoginForm from "./LoginForm";
import Logo from "../Header/Logo";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const SignIn = () => {
  const [alert, setAlert] = useState(false);
  return (
    <div
      style={{

        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div className={"login"}>
        {alert ? (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="error">Username or password incorrect!</Alert>
          </Stack>
        ) : (
          ""
        )}

        <LoginForm setAlert={setAlert} />
      </div>
    </div>
  );
};

export default SignIn;
