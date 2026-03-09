import { Snackbar, makeStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  snackbar: {
    "& .MuiAlert-root": {
      borderRadius: theme.spacing(1.5),
      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
      backdropFilter: "blur(10px)",
      fontWeight: 600,
    },
    "& .MuiAlert-standardSuccess": {
      background: "linear-gradient(135deg, #48bb78 0%, #38a169 100%)",
      color: "white",
    },
    "& .MuiAlert-standardError": {
      background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)",
      color: "white",
    },
    "& .MuiAlert-standardWarning": {
      background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      color: "white",
    },
    "& .MuiAlert-standardInfo": {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
    },
  },
}));

const MessagePopup = (props) => {
  const classes = useStyles();
  
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    props.setOpen(false);
  };
  
  return (
    <Snackbar 
      open={props.open} 
      onClose={handleClose} 
      autoHideDuration={3000}
      className={classes.snackbar}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={handleClose} severity={props.severity}>
        {props.message}
      </Alert>
    </Snackbar>
  );
};

export default MessagePopup;






