import Toolbar from "@mui/material/Toolbar";

export default function Logo({ logo }) {
  return (
    <Toolbar className="logo">
      <img src={logo} alt="logo" className="logo" />
    </Toolbar>
  );
}
