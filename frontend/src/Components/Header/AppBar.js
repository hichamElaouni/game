import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Logo from "./Logo";
import LeftSlider from "./LeftSlider";
import AccountMenu from "./AccountMenu";
import logo from "../images/logo.png";

export default function AppBAr() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setOpen(open);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon onClick={toggleDrawer(true)} />
            <LeftSlider isOpen={open} toggleDrawer={toggleDrawer} />
          </IconButton>
          <Logo logo={logo} />
          <AccountMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
