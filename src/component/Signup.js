import { useState, useContext } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  makeStyles,
  Paper,
  MenuItem,
  Card,
  CardContent,
  Box,
  Fade,
  Stepper,
  Step,
  StepLabel,
} from "@material-ui/core";
import axios from "axios";
import { Redirect } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import DescriptionIcon from "@material-ui/icons/Description";
import FaceIcon from "@material-ui/icons/Face";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import BusinessIcon from "@material-ui/icons/Business";
import PersonIcon from "@material-ui/icons/Person";

import PasswordInput from "../lib/PasswordInput";
import EmailInput from "../lib/EmailInput";
import FileUploadInput from "../lib/FileUploadInput";
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
  signupCard: {
    position: "relative",
    zIndex: 1,
    borderRadius: theme.spacing(3),
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    overflow: "visible",
    maxWidth: 800,
    width: "100%",
    maxHeight: "90vh",
    overflowY: "auto",
  },
  signupContent: {
    padding: theme.spacing(4),
  },
  signupHeader: {
    textAlign: "center",
    marginBottom: theme.spacing(4),
  },
  signupIcon: {
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
  signupTitle: {
    fontWeight: 700,
    fontSize: "2rem",
    color: "#2d3748",
    marginBottom: theme.spacing(1),
  },
  signupSubtitle: {
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
  phoneInputContainer: {
    "& .react-tel-input": {
      "& .form-control": {
        width: "100%",
        height: "56px",
        borderRadius: theme.spacing(1.5),
        border: "1px solid #c4c4c4",
        fontSize: "16px",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(102, 126, 234, 0.15)",
        },
        "&:focus": {
          borderColor: "#667eea",
          boxShadow: "0 4px 12px rgba(102, 126, 234, 0.25)",
        },
      },
    },
  },
  signupButton: {
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
  addEducationButton: {
    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    color: "white",
    borderRadius: theme.spacing(1.5),
    padding: theme.spacing(1.5, 3),
    fontWeight: 600,
    fontSize: "0.9rem",
    textTransform: "none",
    boxShadow: "0 4px 15px rgba(240, 147, 251, 0.4)",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 25px rgba(240, 147, 251, 0.6)",
    },
    transition: "all 0.3s ease",
  },
  loginLink: {
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
  sectionTitle: {
    fontWeight: 700,
    color: "#2d3748",
    marginBottom: theme.spacing(2),
    fontSize: "1.2rem",
    display: "flex",
    alignItems: "center",
    "&::before": {
      content: '""',
      width: 4,
      height: 20,
      backgroundColor: "#667eea",
      marginRight: theme.spacing(1.5),
      borderRadius: 2,
    },
  },
  educationCard: {
    backgroundColor: "#f8fafc",
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1.5),
    border: "1px solid #e2e8f0",
    marginBottom: theme.spacing(2),
  },
  uploadSection: {
    padding: theme.spacing(3),
    backgroundColor: "#f0f8ff",
    borderRadius: theme.spacing(1.5),
    border: "2px dashed #667eea",
    textAlign: "center",
    marginBottom: theme.spacing(2),
  },
}));

const MultifieldInput = (props) => {
  const classes = useStyles();
  const { education, setEducation } = props;

  return (
    <>
      {education.map((obj, key) => (
        <div key={key} className={classes.educationCard}>
          <Typography variant="h6" style={{ marginBottom: 16, color: "#2d3748" }}>
            Education #{key + 1}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Institution Name"
                value={education[key].institutionName}
                onChange={(event) => {
                  const newEdu = [...education];
                  newEdu[key].institutionName = event.target.value;
                  setEducation(newEdu);
                }}
                variant="outlined"
                fullWidth
                className={classes.formField}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Start Year"
                value={obj.startYear}
                variant="outlined"
                type="number"
                onChange={(event) => {
                  const newEdu = [...education];
                  newEdu[key].startYear = event.target.value;
                  setEducation(newEdu);
                }}
                fullWidth
                className={classes.formField}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="End Year"
                value={obj.endYear}
                variant="outlined"
                type="number"
                onChange={(event) => {
                  const newEdu = [...education];
                  newEdu[key].endYear = event.target.value;
                  setEducation(newEdu);
                }}
                fullWidth
                className={classes.formField}
              />
            </Grid>
          </Grid>
        </div>
      ))}
      <Button
        variant="contained"
        onClick={() =>
          setEducation([
            ...education,
            {
              institutionName: "",
              startYear: "",
              endYear: "",
            },
          ])
        }
        className={classes.addEducationButton}
        fullWidth
      >
        Add Another Institution
      </Button>
    </>
  );
};

const Signup = (props) => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);

  const [loggedin, setLoggedin] = useState(isAuth());

  const [signupDetails, setSignupDetails] = useState({
    type: "applicant",
    email: "",
    password: "",
    name: "",
    education: [],
    skills: [],
    resume: "",
    profile: "",
    bio: "",
    contactNumber: "",
  });

  const [phone, setPhone] = useState("");

  const [education, setEducation] = useState([
    {
      institutionName: "",
      startYear: "",
      endYear: "",
    },
  ]);

  const [inputErrorHandler, setInputErrorHandler] = useState({
    email: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
    password: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
    name: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
  });

  const handleInput = (key, value) => {
    setSignupDetails({
      ...signupDetails,
      [key]: value,
    });
  };

  const handleInputError = (key, status, message) => {
    setInputErrorHandler({
      ...inputErrorHandler,
      [key]: {
        required: true,
        untouched: false,
        error: status,
        message: message,
      },
    });
  };

  const handleSignup = () => {
    const tmpErrorHandler = {};
    Object.keys(inputErrorHandler).forEach((obj) => {
      if (inputErrorHandler[obj].required && inputErrorHandler[obj].untouched) {
        tmpErrorHandler[obj] = {
          required: true,
          untouched: false,
          error: true,
          message: `${obj[0].toUpperCase() + obj.substr(1)} is required`,
        };
      } else {
        tmpErrorHandler[obj] = inputErrorHandler[obj];
      }
    });

    let updatedDetails = {
      ...signupDetails,
      education: education
        .filter((obj) => obj.institutionName.trim() !== "")
        .map((obj) => {
          if (obj["endYear"] === "") {
            delete obj["endYear"];
          }
          return obj;
        }),
    };

    if (phone !== "") {
      updatedDetails = {
        ...updatedDetails,
        contactNumber: `+${phone}`,
      };
    }

    setSignupDetails(updatedDetails);

    const verified = !Object.keys(tmpErrorHandler).some((obj) => {
      return tmpErrorHandler[obj].error;
    });

    if (verified) {
      axios
        .post(apiList.signup, updatedDetails)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("type", response.data.type);
          setLoggedin(isAuth());
          setPopup({
            open: true,
            severity: "success",
            message: "Account created successfully",
          });
        })
        .catch((err) => {
          setPopup({
            open: true,
            severity: "error",
            message: err.response?.data?.message || "Signup failed",
          });
        });
    } else {
      setInputErrorHandler(tmpErrorHandler);
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
      <Fade in={true} timeout={800}>
        <Card className={classes.signupCard}>
          <CardContent className={classes.signupContent}>
            {/* Header */}
            <div className={classes.signupHeader}>
              <div className={classes.signupIcon}>
                <PersonAddIcon style={{ fontSize: "2rem" }} />
              </div>
              <Typography className={classes.signupTitle}>
                Create Account
              </Typography>
              <Typography className={classes.signupSubtitle}>
                Join our platform and start your career journey
              </Typography>
            </div>

            {/* Form */}
            <Grid container spacing={3}>
              {/* Account Type */}
              <Grid item xs={12}>
                <Typography className={classes.sectionTitle}>
                  Account Type
                </Typography>
                <TextField
                  select
                  label="I am a..."
                  variant="outlined"
                  fullWidth
                  value={signupDetails.type}
                  onChange={(event) => {
                    handleInput("type", event.target.value);
                  }}
                  className={classes.formField}
                >
                  <MenuItem value="applicant">
                    <Box display="flex" alignItems="center">
                      <PersonIcon style={{ marginRight: 8 }} />
                      Job Seeker
                    </Box>
                  </MenuItem>
                  <MenuItem value="recruiter">
                    <Box display="flex" alignItems="center">
                      <BusinessIcon style={{ marginRight: 8 }} />
                      Recruiter/Company
                    </Box>
                  </MenuItem>
                </TextField>
              </Grid>

              {/* Basic Information */}
              <Grid item xs={12}>
                <Typography className={classes.sectionTitle}>
                  Basic Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Full Name"
                      value={signupDetails.name}
                      onChange={(event) => handleInput("name", event.target.value)}
                      className={classes.formField}
                      error={inputErrorHandler.name.error}
                      helperText={inputErrorHandler.name.message}
                      onBlur={(event) => {
                        if (event.target.value === "") {
                          handleInputError("name", true, "Name is required");
                        } else {
                          handleInputError("name", false, "");
                        }
                      }}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <EmailInput
                      label="Email Address"
                      value={signupDetails.email}
                      onChange={(event) => handleInput("email", event.target.value)}
                      inputErrorHandler={inputErrorHandler}
                      handleInputError={handleInputError}
                      className={classes.formField}
                      required={true}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <PasswordInput
                      label="Password"
                      value={signupDetails.password}
                      onChange={(event) => handleInput("password", event.target.value)}
                      className={classes.formField}
                      error={inputErrorHandler.password.error}
                      helperText={inputErrorHandler.password.message}
                      onBlur={(event) => {
                        if (event.target.value === "") {
                          handleInputError("password", true, "Password is required");
                        } else {
                          handleInputError("password", false, "");
                        }
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* Conditional Fields */}
              {signupDetails.type === "applicant" ? (
                <>
                  {/* Education */}
                  <Grid item xs={12}>
                    <Typography className={classes.sectionTitle}>
                      Education
                    </Typography>
                    <MultifieldInput
                      education={education}
                      setEducation={setEducation}
                    />
                  </Grid>

                  {/* Skills */}
                  <Grid item xs={12}>
                    <Typography className={classes.sectionTitle}>
                      Skills
                    </Typography>
                    <ChipInput
                      className={classes.chipInput}
                      label="Your Skills"
                      variant="outlined"
                      helperText="Press enter to add skills (e.g., React, Python, Design)"
                      onChange={(chips) =>
                        setSignupDetails({ ...signupDetails, skills: chips })
                      }
                      fullWidth
                    />
                  </Grid>

                  {/* File Uploads */}
                  <Grid item xs={12}>
                    <Typography className={classes.sectionTitle}>
                      Documents
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <div className={classes.uploadSection}>
                          <DescriptionIcon style={{ fontSize: "2rem", color: "#667eea", marginBottom: 8 }} />
                          <Typography variant="body2" style={{ marginBottom: 16 }}>
                            Upload Resume (PDF)
                          </Typography>
                          <FileUploadInput
                            label="Resume (.pdf)"
                            icon={<DescriptionIcon />}
                            uploadTo={apiList.uploadResume}
                            handleInput={handleInput}
                            identifier={"resume"}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <div className={classes.uploadSection}>
                          <FaceIcon style={{ fontSize: "2rem", color: "#667eea", marginBottom: 8 }} />
                          <Typography variant="body2" style={{ marginBottom: 16 }}>
                            Upload Profile Photo
                          </Typography>
                          <FileUploadInput
                            label="Profile Photo (.jpg/.png)"
                            icon={<FaceIcon />}
                            uploadTo={apiList.uploadProfileImage}
                            handleInput={handleInput}
                            identifier={"profile"}
                          />
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              ) : (
                <>
                  {/* Company Bio */}
                  <Grid item xs={12}>
                    <Typography className={classes.sectionTitle}>
                      Company Information
                    </Typography>
                    <TextField
                      label="Company Bio (up to 250 words)"
                      multiline
                      rows={6}
                      variant="outlined"
                      value={signupDetails.bio}
                      onChange={(event) => {
                        if (
                          event.target.value.split(" ").filter(function (n) {
                            return n !== "";
                          }).length <= 250
                        ) {
                          handleInput("bio", event.target.value);
                        }
                      }}
                      fullWidth
                      className={classes.formField}
                      placeholder="Tell us about your company, culture, and what makes you unique..."
                    />
                  </Grid>

                  {/* Contact */}
                  <Grid item xs={12}>
                    <Typography className={classes.sectionTitle}>
                      Contact Information
                    </Typography>
                    <Box className={classes.phoneInputContainer}>
                      <PhoneInput
                        country={"in"}
                        value={phone}
                        onChange={(phone) => setPhone(phone)}
                        inputStyle={{
                          width: "100%",
                          height: "56px",
                          borderRadius: "12px",
                          border: "1px solid #c4c4c4",
                          fontSize: "16px",
                        }}
                        containerStyle={{
                          width: "100%",
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                        <div className={classes.uploadSection}>
                          <FaceIcon style={{ fontSize: "2rem", color: "#667eea", marginBottom: 8 }} />
                          <Typography variant="body2" style={{ marginBottom: 16 }}>
                            Upload Profile Photo
                          </Typography>
                          <FileUploadInput
                            label="Profile Photo (.jpg/.png)"
                            icon={<FaceIcon />}
                            uploadTo={apiList.uploadProfileImage}
                            handleInput={handleInput}
                            identifier={"profile"}
                          />
                        </div>
                  </Grid>
                </>
              )}

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  onClick={handleSignup}
                  className={classes.signupButton}
                  fullWidth
                  size="large"
                  startIcon={<PersonAddIcon />}
                >
                  Create Account
                </Button>
              </Grid>
            </Grid>

            {/* Login Link */}
            <div className={classes.loginLink}>
              Already have an account?{" "}
              <a href="/login">Sign in here</a>
            </div>
          </CardContent>
        </Card>
      </Fade>
    </div>
  );
};

export default Signup;
