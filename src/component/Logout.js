import { useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

import { SetPopupContext } from "../App";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const Logout = (props) => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);
  
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    setPopup({
      open: true,
      severity: "success",
      message: "Logged out successfully",
    });
  }, [setPopup]);
  
  return (
    <div className={classes.root}>
      <Redirect to="/login" />
    </div>
  );
};

export default Logout;
