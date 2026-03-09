import { useContext, useEffect, useState } from "react";
import {
  Button,
  Grid,
  Typography,
  Modal,
  Paper,
  makeStyles,
  TextField,
  MenuItem,
  Card,
  CardContent,
  Box,
  Fade,
  Backdrop,
  IconButton,
} from "@material-ui/core";
import axios from "axios";
import ChipInput from "material-ui-chip-input";
import WorkIcon from "@material-ui/icons/Work";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";

import { SetPopupContext } from "../../App";

import apiList from "../../lib/apiList";

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
  formCard: {
    borderRadius: theme.spacing(2),
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
    background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    overflow: "visible",
  },
  formContent: {
    padding: theme.spacing(4),
  },
  formField: {
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
  chipInput: {
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
    "& .MuiChip-root": {
      backgroundColor: "#e6fffa",
      color: "#234e52",
      fontWeight: 600,
      margin: theme.spacing(0.25),
      "&:hover": {
        backgroundColor: "#b2f5ea",
      },
    },
  },
  submitButton: {
    background: "linear-gradient(135deg, #48bb78 0%, #38a169 100%)",
    color: "white",
    borderRadius: theme.spacing(2),
    padding: theme.spacing(2, 6),
    fontWeight: 700,
    fontSize: "1.1rem",
    textTransform: "none",
    boxShadow: "0 8px 25px rgba(72, 187, 120, 0.4)",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow: "0 12px 35px rgba(72, 187, 120, 0.6)",
    },
    "&:active": {
      transform: "translateY(-1px)",
    },
  },
  sectionTitle: {
    fontWeight: 700,
    color: "#2d3748",
    marginBottom: theme.spacing(3),
    fontSize: "1.3rem",
    display: "flex",
    alignItems: "center",
    "&::before": {
      content: '""',
      width: 4,
      height: 24,
      backgroundColor: "#667eea",
      marginRight: theme.spacing(2),
      borderRadius: 2,
    },
  },
  formSection: {
    marginBottom: theme.spacing(4),
    padding: theme.spacing(3),
    backgroundColor: "#f8fafc",
    borderRadius: theme.spacing(1.5),
    border: "1px solid #e2e8f0",
  },
  successModal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  successPaper: {
    backgroundColor: "white",
    borderRadius: theme.spacing(2),
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
    padding: theme.spacing(4),
    outline: "none",
    maxWidth: 500,
    width: "90%",
    textAlign: "center",
  },
  successIcon: {
    fontSize: "4rem",
    color: "#48bb78",
    marginBottom: theme.spacing(2),
  },
  successTitle: {
    fontWeight: 700,
    color: "#2d3748",
    marginBottom: theme.spacing(2),
  },
  successMessage: {
    color: "#4a5568",
    marginBottom: theme.spacing(3),
  },
  closeButton: {
    color: "#a0aec0",
    "&:hover": {
      color: "#4a5568",
      backgroundColor: "#f7fafc",
    },
  },
}));

const CreateJobs = (props) => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);
  const [showSuccess, setShowSuccess] = useState(false);

  const [jobDetails, setJobDetails] = useState({
    title: "",
    maxApplicants: 100,
    maxPositions: 30,
    deadline: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000)
      .toISOString()
      .substr(0, 16),
    skillsets: [],
    jobType: "Full Time",
    duration: 0,
    salary: 0,
  });

  const handleInput = (key, value) => {
    setJobDetails({
      ...jobDetails,
      [key]: value,
    });
  };

  const handleUpdate = () => {
    axios
      .post(apiList.jobs, jobDetails, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setPopup({
          open: true,
          severity: "success",
          message: response.data.message,
        });
        setShowSuccess(true);
        setJobDetails({
          title: "",
          maxApplicants: 100,
          maxPositions: 30,
          deadline: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000)
            .toISOString()
            .substr(0, 16),
          skillsets: [],
          jobType: "Full Time",
          duration: 0,
          salary: 0,
        });
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: err.response?.data?.message || "Error creating job",
        });
      });
  };

  return (
    <div className={classes.root}>
      <Grid container justify="center">
        <Grid item xs={11} md={10} lg={8}>
          {/* Hero Section */}
          <Paper className={classes.heroSection}>
            <div className={classes.heroContent}>
              <Typography className={classes.heroTitle}>
                Create New Job Listing
              </Typography>
              <Typography className={classes.heroSubtitle}>
                Post your job opportunity and connect with talented professionals
              </Typography>
            </div>
          </Paper>

          {/* Form Section */}
          <Card className={classes.formCard}>
            <CardContent className={classes.formContent}>
              <Grid container spacing={4}>
                {/* Basic Information */}
                <Grid item xs={12}>
                  <div className={classes.formSection}>
                    <Typography className={classes.sectionTitle}>
                      Basic Information
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          label="Job Title"
                          value={jobDetails.title}
                          onChange={(event) =>
                            handleInput("title", event.target.value)
                          }
                          variant="outlined"
                          fullWidth
                          className={classes.formField}
                          placeholder="e.g. Senior Software Engineer"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          select
                          label="Job Type"
                          variant="outlined"
                          value={jobDetails.jobType}
                          onChange={(event) => {
                            handleInput("jobType", event.target.value);
                          }}
                          fullWidth
                          className={classes.formField}
                        >
                          <MenuItem value="Full Time">Full Time</MenuItem>
                          <MenuItem value="Part Time">Part Time</MenuItem>
                          <MenuItem value="Work From Home">Work From Home</MenuItem>
                        </TextField>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          select
                          label="Duration"
                          variant="outlined"
                          value={jobDetails.duration}
                          onChange={(event) => {
                            handleInput("duration", event.target.value);
                          }}
                          fullWidth
                          className={classes.formField}
                        >
                          <MenuItem value={0}>Flexible</MenuItem>
                          <MenuItem value={1}>1 Month</MenuItem>
                          <MenuItem value={2}>2 Months</MenuItem>
                          <MenuItem value={3}>3 Months</MenuItem>
                          <MenuItem value={4}>4 Months</MenuItem>
                          <MenuItem value={5}>5 Months</MenuItem>
                          <MenuItem value={6}>6 Months</MenuItem>
                        </TextField>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>

                {/* Skills & Requirements */}
                <Grid item xs={12}>
                  <div className={classes.formSection}>
                    <Typography className={classes.sectionTitle}>
                      Skills & Requirements
                    </Typography>
                    <ChipInput
                      className={classes.chipInput}
                      label="Required Skills"
                      variant="outlined"
                      helperText="Press enter to add skills (e.g. React, Node.js, Python)"
                      value={jobDetails.skillsets}
                      onAdd={(chip) =>
                        setJobDetails({
                          ...jobDetails,
                          skillsets: [...jobDetails.skillsets, chip],
                        })
                      }
                      onDelete={(chip, index) => {
                        let skillsets = jobDetails.skillsets;
                        skillsets.splice(index, 1);
                        setJobDetails({
                          ...jobDetails,
                          skillsets: skillsets,
                        });
                      }}
                      fullWidth
                    />
                  </div>
                </Grid>

                {/* Compensation & Positions */}
                <Grid item xs={12}>
                  <div className={classes.formSection}>
                    <Typography className={classes.sectionTitle}>
                      Compensation & Positions
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={4}>
                        <TextField
                          label="Monthly Salary (₹)"
                          type="number"
                          variant="outlined"
                          value={jobDetails.salary}
                          onChange={(event) => {
                            handleInput("salary", event.target.value);
                          }}
                          InputProps={{ inputProps: { min: 0 } }}
                          fullWidth
                          className={classes.formField}
                          placeholder="50000"
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          label="Maximum Applicants"
                          type="number"
                          variant="outlined"
                          value={jobDetails.maxApplicants}
                          onChange={(event) => {
                            handleInput("maxApplicants", event.target.value);
                          }}
                          InputProps={{ inputProps: { min: 1 } }}
                          fullWidth
                          className={classes.formField}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          label="Positions Available"
                          type="number"
                          variant="outlined"
                          value={jobDetails.maxPositions}
                          onChange={(event) => {
                            handleInput("maxPositions", event.target.value);
                          }}
                          InputProps={{ inputProps: { min: 1 } }}
                          fullWidth
                          className={classes.formField}
                        />
                      </Grid>
                    </Grid>
                  </div>
                </Grid>

                {/* Application Deadline */}
                <Grid item xs={12}>
                  <div className={classes.formSection}>
                    <Typography className={classes.sectionTitle}>
                      Application Deadline
                    </Typography>
                    <TextField
                      label="Application Deadline"
                      type="datetime-local"
                      value={jobDetails.deadline}
                      onChange={(event) => {
                        handleInput("deadline", event.target.value);
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      fullWidth
                      className={classes.formField}
                    />
                  </div>
                </Grid>

                {/* Submit Button */}
                <Grid item xs={12}>
                  <Box textAlign="center" mt={3}>
                    <Button
                      className={classes.submitButton}
                      onClick={handleUpdate}
                      startIcon={<AddIcon />}
                      size="large"
                    >
                      Create Job Listing
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Success Modal */}
      <Modal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        className={classes.successModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showSuccess}>
          <Paper className={classes.successPaper}>
            <IconButton 
              onClick={() => setShowSuccess(false)}
              className={classes.closeButton}
              style={{ position: 'absolute', top: 8, right: 8 }}
            >
              <CloseIcon />
            </IconButton>
            <WorkIcon className={classes.successIcon} />
            <Typography variant="h4" className={classes.successTitle}>
              Job Created Successfully!
            </Typography>
            <Typography variant="body1" className={classes.successMessage}>
              Your job listing has been posted and is now visible to potential candidates.
            </Typography>
            <Button
              className={classes.submitButton}
              onClick={() => setShowSuccess(false)}
              startIcon={<SaveIcon />}
            >
              Continue
            </Button>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
};

export default CreateJobs;
