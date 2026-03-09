import { useState, useEffect, useContext } from "react";
import {
  Button,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
  Paper,
  TextField,
  Typography,
  Modal,
  Slider,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Checkbox,
  Card,
  CardContent,
  CardActions,
  Box,
  Fade,
  Backdrop,
  Avatar
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import axios from "axios";
import WorkIcon from "@material-ui/icons/Work";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import PersonIcon from "@material-ui/icons/Person";
import EventIcon from "@material-ui/icons/Event";
import CloseIcon from "@material-ui/icons/Close";
import StarIcon from "@material-ui/icons/Star";
import BusinessIcon from "@material-ui/icons/Business";

import { SetPopupContext } from "../App";

import apiList from "../lib/apiList";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(4),
  },
  heroSection: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    padding: theme.spacing(6, 0),
    marginBottom: theme.spacing(4),
    borderRadius: theme.spacing(2),
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
  heroContent: {
    position: "relative",
    zIndex: 1,
    textAlign: "center",
  },
  heroTitle: {
    fontWeight: 700,
    fontSize: "3rem",
    marginBottom: theme.spacing(2),
    textShadow: "0 2px 4px rgba(0,0,0,0.3)",
  },
  heroSubtitle: {
    fontSize: "1.2rem",
    opacity: 0.9,
    maxWidth: 600,
    margin: "0 auto",
  },
  applicationCard: {
    margin: theme.spacing(2, 0),
    borderRadius: theme.spacing(2),
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
    background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
    },
  },
  applicationCardContent: {
    padding: theme.spacing(3),
  },
  jobTitle: {
    fontWeight: 700,
    fontSize: "1.5rem",
    color: "#1a202c",
    marginBottom: theme.spacing(1),
  },
  jobDetail: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
    color: "#4a5568",
    fontSize: "0.95rem",
  },
  jobDetailIcon: {
    marginRight: theme.spacing(1),
    fontSize: "1.2rem",
    color: "#667eea",
  },
  skillChip: {
    margin: theme.spacing(0.5),
    backgroundColor: "#e6fffa",
    color: "#234e52",
    fontWeight: 600,
    "&:hover": {
      backgroundColor: "#b2f5ea",
    },
  },
  statusChip: {
    fontWeight: 700,
    fontSize: "0.9rem",
    padding: theme.spacing(1, 2),
    borderRadius: theme.spacing(2),
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  rateButton: {
    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    color: "white",
    borderRadius: theme.spacing(1.5),
    padding: theme.spacing(1.5, 3),
    fontWeight: 600,
    fontSize: "1rem",
    textTransform: "none",
    boxShadow: "0 4px 15px rgba(240, 147, 251, 0.4)",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 25px rgba(240, 147, 251, 0.6)",
    },
    transition: "all 0.3s ease",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalPaper: {
    backgroundColor: "white",
    borderRadius: theme.spacing(2),
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
    padding: theme.spacing(4),
    outline: "none",
    maxWidth: 500,
    width: "90%",
    textAlign: "center",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(3),
  },
  modalTitle: {
    fontWeight: 700,
    fontSize: "1.5rem",
    color: "#1a202c",
  },
  closeButton: {
    color: "#a0aec0",
    "&:hover": {
      color: "#4a5568",
      backgroundColor: "#f7fafc",
    },
  },
  submitButton: {
    background: "linear-gradient(135deg, #48bb78 0%, #38a169 100%)",
    color: "white",
    borderRadius: theme.spacing(1.5),
    padding: theme.spacing(1.5, 4),
    fontWeight: 600,
    fontSize: "1rem",
    textTransform: "none",
    boxShadow: "0 4px 15px rgba(72, 187, 120, 0.4)",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 25px rgba(72, 187, 120, 0.6)",
    },
    transition: "all 0.3s ease",
  },
  noApplicationsContainer: {
    textAlign: "center",
    padding: theme.spacing(8),
    color: "#4a5568",
  },
  noApplicationsIcon: {
    fontSize: "4rem",
    color: "#cbd5e0",
    marginBottom: theme.spacing(2),
  },
  statsCard: {
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(10px)",
    borderRadius: theme.spacing(2),
    padding: theme.spacing(2),
    textAlign: "center",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    marginBottom: theme.spacing(3),
  },
  statsNumber: {
    fontSize: "2rem",
    fontWeight: 700,
    color: "#667eea",
    marginBottom: theme.spacing(0.5),
  },
  statsLabel: {
    color: "#4a5568",
    fontSize: "0.9rem",
    fontWeight: 500,
  },
}));

const ApplicationTile = (props) => {
  const classes = useStyles();
  const { application } = props;
  const setPopup = useContext(SetPopupContext);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(application.job.rating);

  const appliedOn = new Date(application.dateOfApplication);
  const joinedOn = new Date(application.dateOfJoining);

  const fetchRating = () => {
    axios
      .get(`${apiList.rating}?id=${application.job._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setRating(response.data.rating);
      })
      .catch((err) => {
        console.log(err.response?.data || err.message);
        setPopup({
          open: true,
          severity: "error",
          message: "Error fetching rating",
        });
      });
  };

  const changeRating = () => {
    axios
      .put(
        apiList.rating,
        { rating: rating, jobId: application.job._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setPopup({
          open: true,
          severity: "success",
          message: "Rating updated successfully",
        });
        fetchRating();
        setOpen(false);
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: err.response?.data?.message || "Error updating rating",
        });
        fetchRating();
        setOpen(false);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const colorSet = {
    applied: "#3454D1",
    shortlisted: "#DC851F",
    accepted: "#09BC8A",
    rejected: "#D1345B",
    deleted: "#B49A67",
    cancelled: "#FF8484",
    finished: "#4EA5D9",
  };

  return (
  <Fade in={true} timeout={600}>
    <Card className={classes.applicationCard}>
      <CardContent className={classes.applicationCardContent}>
        <Grid container spacing={3}>
          {/* Left side: Job details and applicant info */}
          <Grid item xs={12} md={9}>

            {/* Applicant Avatar and Name */}
            <Box display="flex" alignItems="center" mb={2}>
              <Avatar
                src={application.applicant?.profile}
                alt={application.applicant?.name}
                style={{ width: 56, height: 56, marginRight: 16 }}
              />
              <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
                {application.applicant?.name}
              </Typography>
            </Box>

            {/* Job Title */}
            <Typography className={classes.jobTitle}>
              {application.job.title}
            </Typography>

            {/* Job Details */}
            <Box className={classes.jobDetail}>
              <BusinessIcon className={classes.jobDetailIcon} />
              <Typography>Company: {application.recruiter.name}</Typography>
            </Box>

            <Box className={classes.jobDetail}>
              <WorkIcon className={classes.jobDetailIcon} />
              <Typography>Role: {application.job.jobType}</Typography>
            </Box>

            <Box className={classes.jobDetail}>
              <AttachMoneyIcon className={classes.jobDetailIcon} />
              <Typography>Salary: ₹{application.job.salary} per month</Typography>
            </Box>

            <Box className={classes.jobDetail}>
              <AccessTimeIcon className={classes.jobDetailIcon} />
              <Typography>
                Duration: {application.job.duration !== 0
                  ? `${application.job.duration} month`
                  : `Flexible`}
              </Typography>
            </Box>

            <Box className={classes.jobDetail}>
              <EventIcon className={classes.jobDetailIcon} />
              <Typography>Applied On: {appliedOn.toLocaleDateString()}</Typography>
            </Box>

            {(application.status === "accepted" || application.status === "finished") && (
              <Box className={classes.jobDetail}>
                <PersonIcon className={classes.jobDetailIcon} />
                <Typography>Joined On: {joinedOn.toLocaleDateString()}</Typography>
              </Box>
            )}

            {/* Skill Chips */}
            <Box mt={2}>
              {application.job.skillsets.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  className={classes.skillChip}
                  size="small"
                />
              ))}
            </Box>
          </Grid>

          {/* Right side: Status chip and Rate Job button */}
          <Grid item xs={12} md={3}>
            <Box display="flex" flexDirection="column" alignItems="center" height="100%">
              
              {/* Status chip */}
              <Chip
                label={application.status}
                className={classes.statusChip}
                style={{
                  backgroundColor: colorSet[application.status],
                  color: "#ffffff",
                  marginBottom: "16px",
                }}
              />

              {/* Rate button for accepted/finished */}
              {(application.status === "accepted" || application.status === "finished") && (
                <Button
                  className={classes.rateButton}
                  onClick={() => {
                    fetchRating();
                    setOpen(true);
                  }}
                  startIcon={<StarIcon />}
                >
                  Rate Job
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </CardContent>

      {/* Rating Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        className={classes.modal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Paper className={classes.modalPaper}>
            <div className={classes.modalHeader}>
              <Typography className={classes.modalTitle}>
                Rate Your Experience
              </Typography>
              <IconButton
                onClick={handleClose}
                className={classes.closeButton}
              >
                <CloseIcon />
              </IconButton>
            </div>

            <Typography variant="body1" style={{ marginBottom: 24, color: "#4a5568" }}>
              How was your experience working on "{application.job.title}"?
            </Typography>

            <Rating
              name="job-rating"
              value={rating === -1 ? null : rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              size="large"
              style={{ marginBottom: 24 }}
            />

            <Button
              className={classes.submitButton}
              onClick={changeRating}
              startIcon={<StarIcon />}
            >
              Submit Rating
            </Button>
          </Paper>
        </Fade>
      </Modal>
    </Card>
  </Fade>
);

};

const Applications = (props) => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(apiList.applications, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setApplications(response.data);
        console.log("Applications Data:", response.data);
      })
      .catch((err) => {
        console.log(err.response?.data || err.message);
        setPopup({
          open: true,
          severity: "error",
          message: "Error fetching applications",
        });
      });
  };

  const getStatusCounts = () => {
    const counts = {
      total: applications.length,
      pending: applications.filter(app => app.status === 'applied').length,
      accepted: applications.filter(app => app.status === 'accepted').length,
      rejected: applications.filter(app => app.status === 'rejected').length,
    };
    return counts;
  };

  const statusCounts = getStatusCounts();

  return (
    <div className={classes.root}>
      <Grid container justify="center">
        <Grid item xs={11} md={10} lg={8}>
          {/* Hero Section */}
          <Paper className={classes.heroSection}>
            <div className={classes.heroContent}>
              <Typography className={classes.heroTitle}>
                My Applications
              </Typography>
              <Typography className={classes.heroSubtitle}>
                Track your job applications and manage your career journey
              </Typography>
              
              {/* Quick Stats */}
              <Grid container spacing={2} style={{ marginTop: 32, maxWidth: 800, margin: '32px auto 0' }}>
                <Grid item xs={6} sm={3}>
                  <div className={classes.statsCard}>
                    <div className={classes.statsNumber}>{statusCounts.total}</div>
                    <div className={classes.statsLabel}>Total Applications</div>
                  </div>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <div className={classes.statsCard}>
                    <div className={classes.statsNumber}>{statusCounts.pending}</div>
                    <div className={classes.statsLabel}>Pending</div>
                  </div>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <div className={classes.statsCard}>
                    <div className={classes.statsNumber}>{statusCounts.accepted}</div>
                    <div className={classes.statsLabel}>Accepted</div>
                  </div>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <div className={classes.statsCard}>
                    <div className={classes.statsNumber}>{statusCounts.rejected}</div>
                    <div className={classes.statsLabel}>Rejected</div>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Paper>

          {/* Applications Section */}
          <Grid container spacing={2}>
            {applications.length > 0 ? (
              applications.map((application, index) => (
                <Grid item xs={12} key={application._id || index}>
                  <ApplicationTile application={application} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <div className={classes.noApplicationsContainer}>
                  <WorkIcon className={classes.noApplicationsIcon} />
                  <Typography variant="h4" gutterBottom>
                    No Applications Found
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    You haven't applied to any jobs yet. Start exploring opportunities!
                  </Typography>
                </div>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Applications; 
