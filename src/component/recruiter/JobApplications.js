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
  Avatar,
  Card,
  CardContent,
  CardActions,
  Box,
  Fade,
  Backdrop,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import axios from "axios";
import FilterListIcon from "@material-ui/icons/FilterList";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import GetAppIcon from "@material-ui/icons/GetApp";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import PersonIcon from "@material-ui/icons/Person";
import EventIcon from "@material-ui/icons/Event";
import CloseIcon from "@material-ui/icons/Close";
import SchoolIcon from "@material-ui/icons/School";
import DescriptionIcon from "@material-ui/icons/Description";
import WorkIcon from "@material-ui/icons/Work";

import { SetPopupContext } from "../../App";

import apiList, { server } from "../../lib/apiList";

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
  filterButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
    color: "white",
    borderRadius: theme.spacing(2),
    padding: theme.spacing(1.5),
    marginTop: theme.spacing(2),
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      transform: "translateY(-2px)",
    },
    transition: "all 0.3s ease",
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
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    border: "4px solid #667eea",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
  },
  applicantName: {
    fontWeight: 700,
    fontSize: "1.5rem",
    color: "#1a202c",
    marginBottom: theme.spacing(1),
  },
  applicantDetail: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
    color: "#4a5568",
    fontSize: "0.95rem",
  },
  applicantDetailIcon: {
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
  sopText: {
    backgroundColor: "#f7fafc",
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    border: "1px solid #e2e8f0",
    fontStyle: "italic",
    color: "#4a5568",
    marginTop: theme.spacing(2),
  },
  actionButton: {
    borderRadius: theme.spacing(1.5),
    padding: theme.spacing(1.5, 2),
    fontWeight: 600,
    fontSize: "0.9rem",
    textTransform: "none",
    margin: theme.spacing(0.5),
    minWidth: 120,
    "&:hover": {
      transform: "translateY(-2px)",
    },
    transition: "all 0.3s ease",
  },
  downloadButton: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
    "&:hover": {
      boxShadow: "0 8px 25px rgba(102, 126, 234, 0.6)",
    },
  },
  shortlistButton: {
    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    color: "white",
    boxShadow: "0 4px 15px rgba(240, 147, 251, 0.4)",
    "&:hover": {
      boxShadow: "0 8px 25px rgba(240, 147, 251, 0.6)",
    },
  },
  acceptButton: {
    background: "linear-gradient(135deg, #48bb78 0%, #38a169 100%)",
    color: "white",
    boxShadow: "0 4px 15px rgba(72, 187, 120, 0.4)",
    "&:hover": {
      boxShadow: "0 8px 25px rgba(72, 187, 120, 0.6)",
    },
  },
  rejectButton: {
    background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)",
    color: "white",
    boxShadow: "0 4px 15px rgba(255, 107, 107, 0.4)",
    "&:hover": {
      boxShadow: "0 8px 25px rgba(255, 107, 107, 0.6)",
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
    maxWidth: 600,
    width: "90%",
    maxHeight: "90vh",
    overflow: "auto",
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
  filterSection: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    backgroundColor: "#f8fafc",
    borderRadius: theme.spacing(1.5),
  },
  filterTitle: {
    fontWeight: 600,
    color: "#2d3748",
    marginBottom: theme.spacing(2),
  },
  sortOption: {
    border: "2px solid #e2e8f0",
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1),
    margin: theme.spacing(0.5),
    transition: "all 0.2s ease",
    "&:hover": {
      borderColor: "#667eea",
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
}));

const FilterPopup = (props) => {
  const classes = useStyles();
  const { open, handleClose, searchOptions, setSearchOptions, getData } = props;
  
  return (
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
              Filter Applications
            </Typography>
            <IconButton 
              onClick={handleClose}
              className={classes.closeButton}
            >
              <CloseIcon />
            </IconButton>
          </div>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <div className={classes.filterSection}>
                <Typography className={classes.filterTitle}>
                  Application Status
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="rejected"
                          checked={searchOptions.status.rejected}
                          onChange={(event) => {
                            setSearchOptions({
                              ...searchOptions,
                              status: {
                                ...searchOptions.status,
                                [event.target.name]: event.target.checked,
                              },
                            });
                          }}
                          color="primary"
                        />
                      }
                      label="Rejected"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="applied"
                          checked={searchOptions.status.applied}
                          onChange={(event) => {
                            setSearchOptions({
                              ...searchOptions,
                              status: {
                                ...searchOptions.status,
                                [event.target.name]: event.target.checked,
                              },
                            });
                          }}
                          color="primary"
                        />
                      }
                      label="Applied"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="shortlisted"
                          checked={searchOptions.status.shortlisted}
                          onChange={(event) => {
                            setSearchOptions({
                              ...searchOptions,
                              status: {
                                ...searchOptions.status,
                                [event.target.name]: event.target.checked,
                              },
                            });
                          }}
                          color="primary"
                        />
                      }
                      label="Shortlisted"
                    />
                  </Grid>
                </Grid>
              </div>
            </Grid>

            <Grid item xs={12}>
              <div className={classes.filterSection}>
                <Typography className={classes.filterTitle}>
                  Sort Options
                </Typography>
                <Grid container spacing={1}>
                  {[
                    { key: "jobApplicant.name", label: "Name" },
                    { key: "dateOfApplication", label: "Date of Application" },
                    { key: "jobApplicant.rating", label: "Rating" }
                  ].map((sortType) => (
                    <Grid item xs={4} key={sortType.key}>
                      <div className={classes.sortOption}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={searchOptions.sort[sortType.key].status}
                              onChange={(event) =>
                                setSearchOptions({
                                  ...searchOptions,
                                  sort: {
                                    ...searchOptions.sort,
                                    [sortType.key]: {
                                      ...searchOptions.sort[sortType.key],
                                      status: event.target.checked,
                                    },
                                  },
                                })
                              }
                              color="primary"
                            />
                          }
                          label={sortType.label}
                        />
                        <IconButton
                          size="small"
                          disabled={!searchOptions.sort[sortType.key].status}
                          onClick={() => {
                            setSearchOptions({
                              ...searchOptions,
                              sort: {
                                ...searchOptions.sort,
                                [sortType.key]: {
                                  ...searchOptions.sort[sortType.key],
                                  desc: !searchOptions.sort[sortType.key].desc,
                                },
                              },
                            });
                          }}
                        >
                          {searchOptions.sort[sortType.key].desc ? (
                            <ArrowDownwardIcon />
                          ) : (
                            <ArrowUpwardIcon />
                          )}
                        </IconButton>
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </Grid>

            <Grid item xs={12}>
              <Box textAlign="center" mt={2}>
                <Button
                  variant="contained"
                  className={classes.submitButton}
                  onClick={() => getData()}
                >
                  Apply Filters
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Fade>
    </Modal>
  );
};

const ApplicationTile = (props) => {
  const classes = useStyles();
  const { application, getData } = props;
  const setPopup = useContext(SetPopupContext);

  const appliedOn = new Date(application.dateOfApplication);

  const colorSet = {
    applied: "#3454D1",
    shortlisted: "#DC851F",
    accepted: "#09BC8A",
    rejected: "#D1345B",
    deleted: "#B49A67",
    cancelled: "#FF8484",
    finished: "#4EA5D9",
  };

  const getResume = () => {
    if (
      application.jobApplicant.resume &&
      application.jobApplicant.resume !== ""
    ) {
      const address = `${server}${application.jobApplicant.resume}`;
      axios(address, {
        method: "GET",
        responseType: "blob",
      })
        .then((response) => {
          const file = new Blob([response.data], { type: "application/pdf" });
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL);
        })
        .catch((error) => {
          setPopup({
            open: true,
            severity: "error",
            message: "Error downloading resume",
          });
        });
    } else {
      setPopup({
        open: true,
        severity: "error",
        message: "No resume found",
      });
    }
  };

  const updateStatus = (status) => {
    const address = `${apiList.applications}/${application._id}`;
    const statusData = {
      status: status,
      dateOfJoining: new Date().toISOString(),
    };
    axios
      .put(address, statusData, {
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
          message: err.response?.data?.message || "Error updating status",
        });
      });
  };

  const renderActionButtons = () => {
    switch (application.status) {
      case "applied":
        return (
          <>
            <Button
              className={`${classes.actionButton} ${classes.shortlistButton}`}
              onClick={() => updateStatus("shortlisted")}
              startIcon={<CheckCircleIcon />}
            >
              Shortlist
            </Button>
            <Button
              className={`${classes.actionButton} ${classes.rejectButton}`}
              onClick={() => updateStatus("rejected")}
              startIcon={<CancelIcon />}
            >
              Reject
            </Button>
          </>
        );
      case "shortlisted":
        return (
          <>
            <Button
              className={`${classes.actionButton} ${classes.acceptButton}`}
              onClick={() => updateStatus("accepted")}
              startIcon={<CheckCircleIcon />}
            >
              Accept
            </Button>
            <Button
              className={`${classes.actionButton} ${classes.rejectButton}`}
              onClick={() => updateStatus("rejected")}
              startIcon={<CancelIcon />}
            >
              Reject
            </Button>
          </>
        );
      default:
        return (
          <Chip
            label={application.status}
            className={classes.statusChip}
            style={{
              backgroundColor: colorSet[application.status],
              color: "#ffffff",
            }}
          />
        );
    }
  };

  return (
    <Fade in={true} timeout={600}>
      <Card className={classes.applicationCard}>
        <CardContent className={classes.applicationCardContent}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3} md={2}>
              <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <Avatar
                  src={`${server}${application.jobApplicant.profile}`}
                  className={classes.avatar}
                />
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6} md={7}>
              <Typography className={classes.applicantName}>
                {application.jobApplicant.name}
              </Typography>
              
              <Box className={classes.applicantDetail}>
                <Rating
                  value={
                    application.jobApplicant.rating !== -1
                      ? application.jobApplicant.rating
                      : null
                  }
                  readOnly
                  size="small"
                />
              </Box>

              <Box className={classes.applicantDetail}>
                <EventIcon className={classes.applicantDetailIcon} />
                <Typography>Applied: {appliedOn.toLocaleDateString()}</Typography>
              </Box>

              <Box className={classes.applicantDetail}>
                <SchoolIcon className={classes.applicantDetailIcon} />
                <Typography>
                  Education: {application.jobApplicant.education
                    .map((edu) => {
                      return `${edu.institutionName} (${edu.startYear}-${
                        edu.endYear ? edu.endYear : "Ongoing"
                      })`;
                    })
                    .join(", ")}
                </Typography>
              </Box>

              <Box className={classes.sopText}>
                <Typography variant="body2">
                  <strong>SOP:</strong> {application.sop !== "" ? application.sop : "Not Submitted"}
                </Typography>
              </Box>

              <Box mt={2}>
                {application.jobApplicant.skills.map((skill, index) => (
                  <Chip 
                    key={index}
                    label={skill} 
                    className={classes.skillChip}
                    size="small"
                  />
                ))}
              </Box>
            </Grid>

            <Grid item xs={12} sm={3} md={3}>
              <Box display="flex" flexDirection="column" height="100%">
                <Button
                  className={`${classes.actionButton} ${classes.downloadButton}`}
                  onClick={getResume}
                  startIcon={<GetAppIcon />}
                >
                  Download Resume
                </Button>
                
                {renderActionButtons()}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Fade>
  );
};

const JobApplications = (props) => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);
  const [applications, setApplications] = useState([]);
  const { jobId } = useParams();
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchOptions, setSearchOptions] = useState({
    status: {
      all: false,
      applied: false,
      shortlisted: false,
      rejected: false,
    },
    sort: {
      "jobApplicant.name": {
        status: false,
        desc: false,
      },
      dateOfApplication: {
        status: true,
        desc: true,
      },
      "jobApplicant.rating": {
        status: false,
        desc: false,
      },
    },
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    let searchParams = [];

    if (searchOptions.status.rejected) {
      searchParams = [...searchParams, `status=rejected`];
    }
    if (searchOptions.status.applied) {
      searchParams = [...searchParams, `status=applied`];
    }
    if (searchOptions.status.shortlisted) {
      searchParams = [...searchParams, `status=shortlisted`];
    }

    let asc = [],
      desc = [];

    Object.keys(searchOptions.sort).forEach((obj) => {
      const item = searchOptions.sort[obj];
      if (item.status) {
        if (item.desc) {
          desc = [...desc, `desc=${obj}`];
        } else {
          asc = [...asc, `asc=${obj}`];
        }
      }
    });
    searchParams = [...searchParams, ...asc, ...desc];
    const queryString = searchParams.join("&");
    let address = `${apiList.applicants}?jobId=${jobId}`;
    if (queryString !== "") {
      address = `${address}&${queryString}`;
    }

    axios
      .get(address, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setApplications(response.data);
      })
      .catch((err) => {
        setApplications([]);
        setPopup({
          open: true,
          severity: "error",
          message: err.response?.data?.message || "Error fetching applications",
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
                Job Applications
              </Typography>
              <Typography className={classes.heroSubtitle}>
                Review and manage applications for this position
              </Typography>
              
              <Box textAlign="center">
                <IconButton 
                  onClick={() => setFilterOpen(true)}
                  className={classes.filterButton}
                >
                  <FilterListIcon />
                  <Typography variant="body2" style={{ marginLeft: 8 }}>
                    Filter & Sort
                  </Typography>
                </IconButton>
              </Box>
            </div>
          </Paper>

          {/* Applications Section */}
          <Grid container spacing={2}>
            {applications.length > 0 ? (
              applications.map((application, index) => (
                <Grid item xs={12} key={application._id || index}>
                  <ApplicationTile application={application} getData={getData} />
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
                    No applications have been submitted for this job yet.
                  </Typography>
                </div>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>

      <FilterPopup
        open={filterOpen}
        searchOptions={searchOptions}
        setSearchOptions={setSearchOptions}
        handleClose={() => setFilterOpen(false)}
        getData={() => {
          getData();
          setFilterOpen(false);
        }}
      />
    </div>
  );
};

export default JobApplications;
