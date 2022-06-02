import { makeStyles } from "@mui/styles";
import {
  AppBar,
  Avatar,
  Box,
  Drawer,
  Toolbar,
  Typography,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { AddCircleOutlineOutlined, SubjectOutlined } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../logo.png";
import { format } from "date-fns";

const drawerWidth = 240;
const useStyles = makeStyles({
  root: {
    display: "flex",
  },
  page: {
    backgroundColor: "#f9f9f9",
    width: "100%",
    padding: 24,
    marginTop: 50,
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  logo: {
    padding: 20,
  },
  date: {
    flexGrow: 1,
  },
  avatar: {
    marginLeft: 10,
  },
});

function Layout({ children }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  // menu items
  const menuItems = [
    {
      text: "My Notes",
      icon: <SubjectOutlined color='primary' />,
      path: "/",
    },
    {
      text: "Create Note",
      icon: <AddCircleOutlineOutlined color='primary' />,
      path: "/create",
    },
  ];
  return (
    <div className={classes.root}>
      {/* App bar */}
      <AppBar style={{ width: `calc(100% - 240px)` }}>
        <Toolbar>
          <Typography className={classes.date}>
            {" "}
            Today is the {format(new Date(), "do MMMM y")}
          </Typography>
          <Typography> Mohamed Taher</Typography>
          <Avatar src='myImage.jpg' alt='avatar' className={classes.avatar} />
        </Toolbar>
      </AppBar>

      {/*Side Drawer */}
      <Drawer
        className={classes.drawer}
        variant='permanent'
        anchor='left'
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <Box
            component='img'
            sx={{
              height: 70,
              width: 100,
              maxHeight: { xs: 50, md: 70 },
              maxWidth: { xs: 70, md: 100 },
            }}
            alt='The house from the offer.'
            src={logo}
            className={classes.logo}
          />
        </div>
        {/* list links */}
        <List>
          {menuItems.map(item => (
            <ListItem
              key={item.text}
              button
              onClick={() => navigate(item.path)}
              style={{
                backgroundColor:
                  location.pathname === item.path ? "#DFDFDE" : null,
              }}
            >
              <ListItemIcon color='primary'>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <div className={classes.page}>{children}</div>
    </div>
  );
}

export default Layout;
