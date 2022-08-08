import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Logo from "./Logo";

const LeftSlider = (props) => {
  const { isOpen, toggleDrawer } = props;
  const columns = ["Home", "Statistics"];

  return (
    <div>
      <Drawer anchor={"left"} open={isOpen} onClose={toggleDrawer(false)}>
        <Box onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <Logo />
          <Divider />
          <List>
            {columns.map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
};

export default LeftSlider;
