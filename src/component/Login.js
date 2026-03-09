import { useContext, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  makeStyles,
  Paper,
  Card,
  CardContent,
  Box,
  Fade,
} from "@material-ui/core";
import axios from "axios";
import { Redirect } from "react-router-dom";
import LockIcon from "@material-ui/icons/Lock";
import PersonIcon from "@material-ui/icons/Person";

import PasswordInput from "../lib/PasswordInput";
import EmailInput from "../lib/EmailInput";
import { SetPopupContext } from "../App";

import apiList from "../lib/apiList";
import isAuth from "../lib/isAuth";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
    position: "relative",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"grain\" width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\"><circle cx=\"50\" cy=\"50\" r=\"1\" fill=\"%23ffffff\" opacity=\"0.1\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23grain)\"/></svg>') repeat",
      opacity: 0.3,
    },
  },
  loginCard: {
    position: "relative",
    zIndex: 1,
    borderRadius: theme.spacing(3),
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    overflow: "visible",
    maxWidth: 450,
    width: "100%",
  },
  loginContent: {
    padding: theme.spacing(5),
  },
  loginHeader: {
    textAlign: "center",
    marginBottom: theme.spacing(4),
  },
  loginIcon: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    margin: "0 auto",
    marginBottom: theme.spacing(2),
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
  },
  loginTitle: {
    fontWeight: 700,
    fontSize: "2rem",
    color: "#2d3748",
    marginBottom: theme.spacing(1),
  },
  loginSubtitle: {
    color: "#4a5568",
    fontSize: "1rem",
  },
  formField: {
    marginBottom: theme.spacing(3),
    "& .MuiOutlinedInput-root": {
      borderRadius: theme.spacing(1.5),
      transition: "all 0.3s ease",
      "&:hover": {
        boxShadow: "0 4px 12px rgba(102, 126, 234, 0.15)",
      },
      "&.Mui-focused": {
        boxShadow: "0 4px 12px rgba(102, 126, 234, 0.25)",
      },
    },
    "& .MuiInputLabel-root": {
      fontWeight: 600,
      color: "#4a5568",
    },
  },
  loginButton: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    borderRadius: theme.spacing(1.5),
    padding: theme.spacing(2),
    fontWeight: 700,
    fontSize: "1.1rem",
    textTransform: "none",
    boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 12px 35px rgba(102, 126, 234, 0.6)",
    },
    "&:active": {
      transform: "translateY(0px)",
    },
  },
  signupLink: {
    textAlign: "center",
    marginTop: theme.spacing(3),
    color: "#4a5568",
    "& a": {
      color: "#667eea",
      textDecoration: "none",
      fontWeight: 600,
      "&:hover": {
        textDecoration: "underline",
      },
    },
  },
  floatingElements: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    "& .floating-circle": {
      position: "absolute",
      borderRadius: "50%",
      background: "rgba(255, 255, 255, 0.1)",
      animation: "$float 6s ease-in-out infinite",
    },
    "& .circle-1": {
      width: 80,
      height: 80,
      top: "10%",
      left: "10%",
      animationDelay: "0s",
    },
    "& .circle-2": {
      width: 120,
      height: 120,
      top: "70%",
      right: "10%",
      animationDelay: "2s",
    },
    "& .circle-3": {
      width: 60,
      height: 60,
      bottom: "20%",
      left: "20%",
      animationDelay: "4s",
    },
  },
  "@keyframes float": {
    "0%, 100%": {
      transform: "translateY(0px)",
    },
    "50%": {
      transform: "translateY(-20px)",
    },
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);

  const [loggedin, setLoggedin] = useState(isAuth());

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const [inputErrorHandler, setInputErrorHandler] = useState({
    email: {
      error: false,
      message: "",
    },
    password: {
      error: false,
      message: "",
    },
  });

  const handleInput = (key, value) => {
    setLoginDetails({
      ...loginDetails,
      [key]: value,
    });
  };

  const handleInputError = (key, status, message) => {
    setInputErrorHandler({
      ...inputErrorHandler,
      [key]: {
        error: status,
        message: message,
      },
    });
  };

  const handleLogin = () => {
    const verified = !Object.keys(inputErrorHandler).some((obj) => {
      return inputErrorHandler[obj].error;
    });
    if (verified) {
      axios
        .post(apiList.login, loginDetails)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("type", response.data.type);
          setLoggedin(isAuth());
          setPopup({
            open: true,
            severity: "success",
            message: "Logged in successfully",
          });
        })
        .catch((err) => {
          setPopup({
            open: true,
            severity: "error",
            message: err.response?.data?.message || "Login failed",
          });
        });
    } else {
      setPopup({
        open: true,
        severity: "error",
        message: "Please check your input",
      });
    }
  };

  return loggedin ? (
    <Redirect to="/" />
  ) : (
    <div className={classes.root}>
      {/* Floating Elements */}
      <div className={classes.floatingElements}>
        <div className="floating-circle circle-1"></div>
        <div className="floating-circle circle-2"></div>
        <div className="floating-circle circle-3"></div>
      </div>

      <Fade in={true} timeout={800}>
        <Card className={classes.loginCard}>
          <CardContent className={classes.loginContent}>
            {/* Header */}
            <div className={classes.loginHeader}>
              <div className={classes.loginIcon}>
                <LockIcon style={{ fontSize: "2rem" }} />
              </div>
              <Typography className={classes.loginTitle}>
                Welcome Back
              </Typography>
              <Typography className={classes.loginSubtitle}>
                Sign in to your account to continue
              </Typography>
            </div>

            {/* Form */}
            <Grid container direction="column" spacing={0}>
              <Grid item className={classes.formField}>
                <EmailInput
                  label="Email Address"
                  value={loginDetails.email}
                  onChange={(event) => handleInput("email", event.target.value)}
                  inputErrorHandler={inputErrorHandler}
                  handleInputError={handleInputError}
                  fullWidth
                />
              </Grid>
              
              <Grid item className={classes.formField}>
                <PasswordInput
                  label="Password"
                  value={loginDetails.password}
                  onChange={(event) => handleInput("password", event.target.value)}
                  className="w-full"
                />
              </Grid>
              
              <Grid item>
                <Button
                  variant="contained"
                  onClick={handleLogin}
                  className={classes.loginButton}
                  fullWidth
                  size="large"
                  startIcon={<PersonIcon />}
                >
                  Sign In
                </Button>
              </Grid>
            </Grid>

            {/* Signup Link */}
            <div className={classes.signupLink}>
              Don't have an account?{" "}
              <a href="/signup">Create one here</a>
            </div>
          </CardContent>
        </Card>
      </Fade>
    </div>
  );
};

export default Login;
