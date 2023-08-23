import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import TwitterLogo from "../styles/assets/twitter-logo1.png";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Tweet from "./Tweet";
import { useContext } from "react";
import { UserContext } from "../App";

const drawerWidth = 240;

export default function PermanentDrawerLeft() {
  const NavItems = [
    { name: "Home", icon: <HomeIcon />, to: "/" },
    { name: "Profile", icon: <AccountBoxIcon />, to: "/profile" },
    {
      name: "Notifications",
      icon: <NotificationsIcon />,
      to: "/notifications",
    },
    { name: "Messages", icon: <MailIcon />, to: "/messages" },
    { name: "More", icon: <MoreHorizIcon />, to: "/more" },
  ];
  const { state, dispatch } = useContext(UserContext)!;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    dispatch({ type: "CLEAR" });
    navigate("/landing");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            border: "none",
          },
        }}
        variant="permanent"
      >
        <img
          src={TwitterLogo}
          alt="logo"
          className="logo"
          style={{ width: 50, marginLeft: 15, marginTop: 20 }}
        />
        <List>
          {NavItems.map((item) => (
            <Link
              to={item.to}
              key={item.name}
              style={{ textDecoration: "none" }}
            >
              <ListItem disablePadding>
                <ListItemButton style={{ color: "black" }}>
                  <ListItemIcon style={{ color: "black", fontWeight: "bold" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body1" fontWeight="bold">
                        {item.name}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>

        {/* <Button
          variant="contained"
          className="default-button-style"
          style={{ width: 150, marginLeft: 15, marginTop: 15 }}
        >
          Tweet
        </Button> */}
        <Tweet />

        <Button
          variant="contained"
          className="logout-button-style"
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </Drawer>
    </Box>
  );
}
