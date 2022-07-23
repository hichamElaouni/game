import * as React from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Input from "@mui/material/Input";
import { TextField } from "@material-ui/core";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@mui/material";

import axios from "axios";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";

import { setAuthJwt, hasLoggedIn } from "../../service/auth";

export default function BasicCard({ setAlert }) {
  const [values, setValues] = React.useState({ showPassword: false });
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  let navigate = useNavigate();

  const handleSubmit = async () => {
    const credentials = { username, password };
    const {
      REACT_APP_BACKEND_URL = "localhost",
      REACT_APP_BACKEND_PORT = 3000,
    } = process.env || {};

    const fullUrl = `${REACT_APP_BACKEND_URL}:${REACT_APP_BACKEND_PORT}`;

    const { status, data } =
      (await axios
        .post(`http://${fullUrl}/login`, credentials)
        .catch((error) => {
          console.log("");
        })) || {};

    if (status === 200) {
      setAuthJwt(data);
      setAlert(false);
      navigate("/");
    } else {
      setAlert(true);
    }
  };

  const handleChange = (type) => (event) => {
    if (type === "username") setUsername(event.target.value);
    else setPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => event.preventDefault();

  if (hasLoggedIn()) {
    return <Navigate to="/" />;
  }

  return (
    <Card sx={{ minWidth: 375, minHeight: 300 }} style={{ borderRadius: 25 }}>
      <div style={{ marginLeft: "10%" }}>
        <CardContent>
          <PersonIcon style={{ margin: "6% 5% 0 0" }} />
          <TextField
            id="outlined-required"
            label="Nom d'utilisateur"
            value={values.username}
            onChange={handleChange("username")}
          />
        </CardContent>
        <CardActions>
          <KeyIcon style={{ margin: "6% 5% 0 3%" }} />
          <FormControl sx={{ width: "21ch" }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </CardActions>
      </div>
      <div style={{ padding: "10%" }}>
        <Button
          style={{ backgroundColor: "#F92763", borderRadius: 7 }}
          size="large"
          sx={{ minWidth: 300 }}
          variant="contained"
          onClick={handleSubmit}
        >
          Se connecter
        </Button>
      </div>
    </Card>
  );
}
