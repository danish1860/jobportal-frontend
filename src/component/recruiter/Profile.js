import { useContext, useEffect, useState } from "react";
import {
  Button,
  Grid,
  Typography,
  Paper,
  makeStyles,
  TextField,
  Card,
  CardContent,
  Box,
  Avatar,
  Fade,
} from "@material-ui/core";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import PersonIcon from "@material-ui/icons/Person";
import BusinessIcon from "@material-ui/icons/Business";
import PhoneIcon from "@material-ui/icons/Phone";
import SaveIcon from "@material-ui/icons/Save";

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
  profileCard: {
    borderRadius: theme.spacing(2),
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
    background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    overflow: "visible",
  },
  profileContent: {
    padding: theme.spacing(4),
  },
  profileHeader: {
    textAlign: "center",
    marginBottom: theme.spacing(4),
  },
  profileAvatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    margin: "0 auto",
    marginBottom: theme.spacing(2),
    border: "4px solid #667eea",
    boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
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
  fieldIcon: {
    color: "#667eea",
    marginRight: theme.spacing(1),
  },
}));

const Profile = (props) => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);

  const [profileDetails, setProfileDetails] = useState({
    name: "",
    bio: "",
    contactNumber: "",
    profile: "",
  });

  const [phone, setPhone] = useState("");

  const handleInput = (key, value) => {
    setProfileDetails({
      ...profileDetails,
      [key]: value,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(apiList.user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setProfileDetails(response.data);
        setPhone(response.data.contactNumber);
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: "Error fetching profile data",
        });
      });
  };

  const handleUpdate = () => {
    let updatedDetails = {
      ...profileDetails,
    };
    if (phone !== "") {
      updatedDetails = {
        ...profileDetails,
        contactNumber: `+${phone}`,
      };
    } else {
      updatedDetails = {
        ...profileDetails,
        contactNumber: "",
      };
    }

    axios
      .put(apiList.user, updatedDetails, {
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
        getData();
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: err.response?.data?.message || "Error updating profile",
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
                Recruiter Profile
              </Typography>
              <Typography className={classes.heroSubtitle}>
                Manage your professional information and company details
              </Typography>
            </div>
          </Paper>

          {/* Profile Form */}
          <Fade in={true} timeout={800}>
            <Card className={classes.profileCard}>
              <CardContent className={classes.profileContent}>
                {/* Profile Header */}
                <div className={classes.profileHeader}>
                  <Avatar className={classes.profileAvatar}>
                    <BusinessIcon style={{ fontSize: "3rem" }} />
                  </Avatar>
                  <Typography variant="h4" style={{ fontWeight: 700, color: "#2d3748" }}>
                    {profileDetails.name || "Your Company"}
                  </Typography>
                </div>

                <Grid container spacing={4}>
                  {/* Basic Information */}
                  <Grid item xs={12}>
                    <div className={classes.formSection}>
                      <Typography className={classes.sectionTitle}>
                        <PersonIcon className={classes.fieldIcon} />
                        Basic Information
                      </Typography>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <TextField
                            label="Company/Organization Name"
                            value={profileDetails.name}
                            onChange={(event) =>
                              handleInput("name", event.target.value)
                            }
                            variant="outlined"
                            fullWidth
                            className={classes.formField}
                            placeholder="Enter your company name"
                          />
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>

                  {/* Company Description */}
                  <Grid item xs={12}>
                    <div className={classes.formSection}>
                      <Typography className={classes.sectionTitle}>
                        <BusinessIcon className={classes.fieldIcon} />
                        Company Description
                      </Typography>
                      <TextField
                        label="Bio (up to 250 words)"
                        multiline
                        rows={6}
                        variant="outlined"
                        value={profileDetails.bio}
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
                        helperText={`${
                          profileDetails.bio
                            ? profileDetails.bio.split(" ").filter(n => n !== "").length
                            : 0
                        }/250 words`}
                      />
                    </div>
                  </Grid>

                  {/* Contact Information */}
                  <Grid item xs={12}>
                    <div className={classes.formSection}>
                      <Typography className={classes.sectionTitle}>
                        <PhoneIcon className={classes.fieldIcon} />
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
                    </div>
                  </Grid>

                  {/* Submit Button */}
                  <Grid item xs={12}>
                    <Box textAlign="center" mt={3}>
                      <Button
                        className={classes.submitButton}
                        onClick={handleUpdate}
                        startIcon={<SaveIcon />}
                        size="large"
                      >
                        Update Profile
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Fade>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;

