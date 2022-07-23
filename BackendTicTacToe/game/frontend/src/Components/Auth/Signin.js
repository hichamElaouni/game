import React, { useState } from "react";
import LoginForm from "./LoginForm";
import Logo from "../Header/Logo";
import background from "../images/background.png";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import logo from "../images/logo.png";

const SignIn = () => {
  const [alert, setAlert] = useState(false);
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
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
        <Logo logo={logo} />
        <LoginForm setAlert={setAlert} />
      </div>
    </div>
  );
};

export default SignIn;
