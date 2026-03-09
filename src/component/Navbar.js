import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { Menu as MenuIcon, Work, ExitToApp } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { useState } from "react";

import isAuth, { userType } from "../lib/isAuth";
import { Link } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    background: "linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #7c3aed 100%)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
  },
  toolbar: {
    minHeight: 64,
    padding: theme.spacing(0, 2),
  },
  title: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    fontWeight: 700,
    fontSize: "1.5rem",
    letterSpacing: "0.5px",
  },
  logo: {
    marginRight: theme.spacing(1),
    padding: theme.spacing(0.5),
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: theme.spacing(1),
    backdropFilter: "blur(10px)",
  },
  navButton: {
    marginLeft: theme.spacing(0.5),
    padding: theme.spacing(1, 2),
    borderRadius: theme.spacing(1),
    fontWeight: 600,
    fontSize: "0.875rem",
    letterSpacing: "0.5px",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      transform: "translateY(-1px)",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    },
  },
  logoutButton: {
    marginLeft: theme.spacing(0.5),
    padding: theme.spacing(1, 2),
    borderRadius: theme.spacing(1),
    fontWeight: 600,
    fontSize: "0.875rem",
    letterSpacing: "0.5px",
    transition: "all 0.3s ease",
    backgroundColor: "rgba(239, 68, 68, 0.2)",
    "&:hover": {
      backgroundColor: "rgba(239, 68, 68, 0.3)",
      transform: "translateY(-1px)",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    },
  },
  menuButton: {
    marginLeft: theme.spacing(1),
  },
  mobileMenu: {
    "& .MuiPaper-root": {
      background: "linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #7c3aed 100%)",
      color: "white",
      marginTop: theme.spacing(1),
      borderRadius: theme.spacing(1),
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
    },
  },
  mobileMenuItem: {
    padding: theme.spacing(1.5, 2),
    fontWeight: 600,
    letterSpacing: "0.5px",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  },
}));

const Navbar = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  let history = useHistory();

  const handleClick = (location) => {
    console.log(location);
    history.push(location);
    setMobileMenuAnchor(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const renderDesktopNav = () => {
    if (isAuth()) {
      if (userType() === "recruiter") {
        return (
          <>
            <Button 
              color="inherit" 
              onClick={() => handleClick("/home")}
              className={classes.navButton}
            >
              HOME
            </Button>
            <Button 
              color="inherit" 
              onClick={() => handleClick("/addjob")}
              className={classes.navButton}
            >
              ADD JOBS
            </Button>
            <Button 
              color="inherit" 
              onClick={() => handleClick("/myjobs")}
              className={classes.navButton}
            >
              MY JOBS
            </Button>
            <Button 
              color="inherit" 
              onClick={() => handleClick("/employees")}
              className={classes.navButton}
            >
              EMPLOYEES
            </Button>
            <Button 
              color="inherit" 
              onClick={() => handleClick("/profile")}
              className={classes.navButton}
            >
              PROFILE
            </Button>
            <Button 
              color="inherit" 
              onClick={() => handleClick("/logout")}
              className={classes.logoutButton}
              startIcon={<ExitToApp />}
            >
              LOGOUT
            </Button>
          </>
        );
      } else {
        return (
          <>
            <Button 
              color="inherit" 
              onClick={() => handleClick("/home")}
              className={classes.navButton}
            >
              HOME
            </Button>
            <Button
              color="inherit"
              onClick={() => handleClick("/applications")}
              className={classes.navButton}
            >
              APPLICATIONS
            </Button>
            <Button 
              color="inherit" 
              onClick={() => handleClick("/profile")}
              className={classes.navButton}
            >
              PROFILE
            </Button>
            <Button 
              color="inherit" 
              onClick={() => handleClick("/logout")}
              className={classes.logoutButton}
              startIcon={<ExitToApp />}
            >
              LOGOUT
            </Button>
          </>
        );
      }
    } else {
      return (
        <>
          <Button 
            color="inherit" 
            onClick={() => handleClick("/login")}
            className={classes.navButton}
          >
            LOGIN
          </Button>
          <Button 
            color="inherit" 
            onClick={() => handleClick("/signup")}
            className={classes.navButton}
          >
            SIGNUP
          </Button>
        </>
      );
    }
  };

  const renderMobileMenuItems = () => {
    if (isAuth()) {
      if (userType() === "recruiter") {
        return [
          { label: "HOME", path: "/home" },
          { label: "ADD JOBS", path: "/addjob" },
          { label: "MY JOBS", path: "/myjobs" },
          { label: "EMPLOYEES", path: "/employees" },
          { label: "PROFILE", path: "/profile" },
          { label: "LOGOUT", path: "/logout" },
        ];
      } else {
        return [
          { label: "HOME", path: "/home" },
          { label: "APPLICATIONS", path: "/applications" },
          { label: "PROFILE", path: "/profile" },
          { label: "LOGOUT", path: "/logout" },
        ];
      }
    } else {
      return [
        { label: "LOGIN", path: "/login" },
        { label: "SIGNUP", path: "/signup" },
      ];
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.title}>
            <div className={classes.logo}>
              <Work />
            </div>
            <RouterLink to="/">Job Portal</RouterLink>
          </Typography>
          
          {!isMobile ? (
            renderDesktopNav()
          ) : (
            <>
              <IconButton
                edge="end"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={handleMobileMenuOpen}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={mobileMenuAnchor}
                keepMounted
                open={Boolean(mobileMenuAnchor)}
                onClose={handleMobileMenuClose}
                className={classes.mobileMenu}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                {renderMobileMenuItems().map((item, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => handleClick(item.path)}
                    className={classes.mobileMenuItem}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;

