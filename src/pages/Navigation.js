// import React,{} from "react";
// import { Dropdown, Menu, Icon, Button } from "semantic-ui-react";
// import { withRouter } from "react-router-dom";
// import { signout } from "./auth";
// function Navigation() {
//   return (
//     <div>
//       <Menu size="massive">
//         <Dropdown item icon="th list">
//           <Dropdown.Menu color="green">
//             <Dropdown.Divider />
//             <Dropdown.Item href="/Producttable">ProductTable</Dropdown.Item>
//             <Dropdown.Divider />
//             <Dropdown.Item href="/Orders">Orders</Dropdown.Item>
//             <Dropdown.Divider />
//             <Dropdown.Item href="/WebBanners">WebBanners</Dropdown.Item>
//             <Dropdown.Divider />
//             <Dropdown.Item href="/GalleryManagement">
//               GalleryManagement
//             </Dropdown.Item>
//             <Dropdown.Divider />
//           </Dropdown.Menu>
//         </Dropdown>
//       </Menu>
//       <div
//         style={{
//           position: "absolute",
//           top: "9px",
//           left: "50%",
//           marginLeft: "620px",
//         }}
//       >
//         <Button onClick={signout} color="blue">
//           <Icon name="sign-out"></Icon>SignOut
//         </Button>
//       </div>
//       {/* Onclicking signout button redirecting to index.js to redirect it to login page */}
//     </div>
//   );
// }
// export default withRouter(Navigation);

import React from "react";
import { Link } from "react-router-dom";
import { signout } from "./auth";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import AppsIcon from "@material-ui/icons/Apps";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DashboardIcon from '@material-ui/icons/Dashboard';
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "black",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
  },
  menuButton: {
    marginRight: 15,
  },
  hide: {
    display: "none", // Hide menu button onclick on it
  },
  drawer: {
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    backgroundColor: "#FFF176",
  },
  drawerClose: {
    backgroundColor: "#D7CCC8",
    overflowX: "hidden",
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
}));

export default function Navigation() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <AppsIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            <b style={{ fontSize: "20px" }}>Navigation Bar</b>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider/>
        <List>
          <ListItem button component={Link} to="/Piechart" > 
            <ListItemIcon>{<DashboardIcon size="15px" />}</ListItemIcon>
            <ListItemText
              primary={
                <Typography>
                  <b style={{ color: "black", fontSize: "16px" }}>
                    Dashboard
                  </b>
                </Typography>
              }
            />
          </ListItem>
        </List>
        <List>
          <ListItem button component={Link} to="/producttable" >
            <ListItemIcon>{<InboxIcon size="15px" />}</ListItemIcon>
            <ListItemText
              primary={
                <Typography>
                  <b style={{ color: "black", fontSize: "16px" }}>
                    ProductTable
                  </b>
                </Typography>
              }
            />
          </ListItem>
        </List>
        <List>
          <ListItem button component={Link} to="/Orders">
            <ListItemIcon>{<MailIcon />}</ListItemIcon>
            <ListItemText
              primary={
                <Typography>
                  <b style={{ color: "black", fontSize: "16px" }}>Orders</b>
                </Typography>
              }
            />
          </ListItem>
        </List>
        <List>
          <ListItem button component={Link} onClick={signout}>
            <ListItemIcon>{<ExitToAppIcon />}</ListItemIcon>
            <ListItemText
              primary={
                <Typography>
                  <b style={{ color: "black", fontSize: "16px" }}>Sign Out</b>
                </Typography>
              }
            />
          </ListItem>
        </List>
        <Divider/>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar}/>
      </main>
    </div>
  );
}
