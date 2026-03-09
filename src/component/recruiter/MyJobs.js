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
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
import FilterListIcon from "@material-ui/icons/FilterList";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import WorkIcon from "@material-ui/icons/Work";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import PersonIcon from "@material-ui/icons/Person";
import EventIcon from "@material-ui/icons/Event";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";

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
  searchContainer: {
    position: "relative",
    zIndex: 1,
    maxWidth: 800,
    margin: "0 auto",
  },
  searchField: {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(10px)",
      borderRadius: theme.spacing(2),
      "& fieldset": {
        borderColor: "transparent",
      },
      "&:hover fieldset": {
        borderColor: theme.palette.primary.main,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
      },
    },
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
  jobCard: {
    margin: theme.spacing(2, 0),
    borderRadius: theme.spacing(2),
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
    background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    "&:hover": {
      transform: "translateY(-8px)",
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
    },
  },
  jobCardContent: {
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
  viewButton: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
    "&:hover": {
      boxShadow: "0 8px 25px rgba(102, 126, 234, 0.6)",
    },
  },
  updateButton: {
    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    color: "white",
    boxShadow: "0 4px 15px rgba(240, 147, 251, 0.4)",
    "&:hover": {
      boxShadow: "0 8px 25px rgba(240, 147, 251, 0.6)",
    },
  },
  deleteButton: {
    background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)",
    color: "white",
    boxShadow: "0 4px 15px rgba(255, 107, 107, 0.4)",
    "&:hover": {
      boxShadow: "0 8px 25px rgba(255, 107, 107, 0.6)",
    },
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
  updateField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: theme.spacing(1.5),
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
  cancelButton: {
    background: "linear-gradient(135deg, #a0aec0 0%, #718096 100%)",
    color: "white",
    borderRadius: theme.spacing(1.5),
    padding: theme.spacing(1.5, 4),
    fontWeight: 600,
    fontSize: "1rem",
    textTransform: "none",
    "&:hover": {
      transform: "translateY(-2px)",
    },
    transition: "all 0.3s ease",
  },
  filterModal: {
    "& .MuiPaper-root": {
      borderRadius: theme.spacing(2),
      maxWidth: 800,
      width: "90%",
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
  noJobsContainer: {
    textAlign: "center",
    padding: theme.spacing(8),
    color: "#4a5568",
  },
  noJobsIcon: {
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

const JobTile = (props) => {
  const classes = useStyles();
  let history = useHistory();
  const { job, getData } = props;
  const setPopup = useContext(SetPopupContext);

  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [jobDetails, setJobDetails] = useState(job);

  const handleInput = (key, value) => {
    setJobDetails({
      ...jobDetails,
      [key]: value,
    });
  };

  const handleClick = (location) => {
    history.push(location);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const handleDelete = () => {
    axios
      .delete(`${apiList.jobs}/${job._id}`, {
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
        handleClose();
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: err.response?.data?.message || "Error deleting job",
        });
        handleClose();
      });
  };

  const handleJobUpdate = () => {
    axios
      .put(`${apiList.jobs}/${job._id}`, jobDetails, {
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
        handleCloseUpdate();
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: err.response?.data?.message || "Error updating job",
        });
        handleCloseUpdate();
      });
  };

  const postedOn = new Date(job.dateOfPosting);

  return (
    <Fade in={true} timeout={600}>
      <Card className={classes.jobCard}>
        <CardContent className={classes.jobCardContent}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Typography className={classes.jobTitle}>
                {job.title}
              </Typography>
              
              <Box className={classes.jobDetail}>
                <Rating 
                  value={job.rating !== -1 ? job.rating : null} 
                  readOnly 
                  size="small"
                />
              </Box>

              <Box className={classes.jobDetail}>
                <WorkIcon className={classes.jobDetailIcon} />
                <Typography>Role: {job.jobType}</Typography>
              </Box>

              <Box className={classes.jobDetail}>
                <AttachMoneyIcon className={classes.jobDetailIcon} />
                <Typography>Salary: ₹{job.salary} per month</Typography>
              </Box>

              <Box className={classes.jobDetail}>
                <AccessTimeIcon className={classes.jobDetailIcon} />
                <Typography>
                  Duration: {job.duration !== 0 ? `${job.duration} month` : `Flexible`}
                </Typography>
              </Box>

              <Box className={classes.jobDetail}>
                <EventIcon className={classes.jobDetailIcon} />
                <Typography>Posted: {postedOn.toLocaleDateString()}</Typography>
              </Box>

              <Box className={classes.jobDetail}>
                <PersonIcon className={classes.jobDetailIcon} />
                <Typography>Applicants: {job.maxApplicants}</Typography>
              </Box>

              <Box className={classes.jobDetail}>
                <WorkIcon className={classes.jobDetailIcon} />
                <Typography>
                  Remaining Positions: {job.maxPositions - job.acceptedCandidates}
                </Typography>
              </Box>

              <Box mt={2}>
                {job.skillsets.map((skill, index) => (
                  <Chip 
                    key={index}
                    label={skill} 
                    className={classes.skillChip}
                    size="small"
                  />
                ))}
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box display="flex" flexDirection="column" height="100%">
                <Button
                  className={`${classes.actionButton} ${classes.viewButton}`}
                  onClick={() => handleClick(`/job/applications/${job._id}`)}
                  startIcon={<VisibilityIcon />}
                >
                  View Applications
                </Button>
                
                <Button
                  className={`${classes.actionButton} ${classes.updateButton}`}
                  onClick={() => setOpenUpdate(true)}
                  startIcon={<EditIcon />}
                >
                  Update Details
                </Button>
                
                <Button
                  className={`${classes.actionButton} ${classes.deleteButton}`}
                  onClick={() => setOpen(true)}
                  startIcon={<DeleteIcon />}
                >
                  Delete Job
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>

        {/* Delete Confirmation Modal */}
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
                  Confirm Deletion
                </Typography>
                <IconButton 
                  onClick={handleClose}
                  className={classes.closeButton}
                >
                  <CloseIcon />
                </IconButton>
              </div>
              
              <Typography variant="body1" style={{ marginBottom: 24, color: "#4a5568" }}>
                Are you sure you want to delete "{job.title}"? This action cannot be undone.
              </Typography>
              
              <Box display="flex" justifyContent="center" gap={2}>
                <Button
                  className={classes.deleteButton}
                  onClick={handleDelete}
                  startIcon={<DeleteIcon />}
                >
                  Delete Job
                </Button>
                <Button
                  className={classes.cancelButton}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Box>
            </Paper>
          </Fade>
        </Modal>

        {/* Update Job Modal */}
        <Modal
          open={openUpdate}
          onClose={handleCloseUpdate}
          className={classes.modal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openUpdate}>
            <Paper className={classes.modalPaper}>
              <div className={classes.modalHeader}>
                <Typography className={classes.modalTitle}>
                  Update Job Details
                </Typography>
                <IconButton 
                  onClick={handleCloseUpdate}
                  className={classes.closeButton}
                >
                  <CloseIcon />
                </IconButton>
              </div>
              
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label="Application Deadline"
                    type="datetime-local"
                    value={jobDetails.deadline.substr(0, 16)}
                    onChange={(event) => {
                      handleInput("deadline", event.target.value);
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    fullWidth
                    className={classes.updateField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Maximum Number Of Applicants"
                    type="number"
                    variant="outlined"
                    value={jobDetails.maxApplicants}
                    onChange={(event) => {
                      handleInput("maxApplicants", event.target.value);
                    }}
                    InputProps={{ inputProps: { min: 1 } }}
                    fullWidth
                    className={classes.updateField}
                  />
                </Grid>
                <Grid item xs={12}>
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
                    className={classes.updateField}
                  />
                </Grid>
              </Grid>
              
              <Box display="flex" justifyContent="center" gap={2} mt={3}>
                <Button
                  className={classes.submitButton}
                  onClick={handleJobUpdate}
                  startIcon={<EditIcon />}
                >
                  Update Job
                </Button>
                <Button
                  className={classes.cancelButton}
                  onClick={handleCloseUpdate}
                >
                  Cancel
                </Button>
              </Box>
            </Paper>
          </Fade>
        </Modal>
      </Card>
    </Fade>
  );
};

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
              Filter Jobs
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
                  Job Type
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="fullTime"
                          checked={searchOptions.jobType.fullTime}
                          onChange={(event) => {
                            setSearchOptions({
                              ...searchOptions,
                              jobType: {
                                ...searchOptions.jobType,
                                [event.target.name]: event.target.checked,
                              },
                            });
                          }}
                          color="primary"
                        />
                      }
                      label="Full Time"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="partTime"
                          checked={searchOptions.jobType.partTime}
                          onChange={(event) => {
                            setSearchOptions({
                              ...searchOptions,
                              jobType: {
                                ...searchOptions.jobType,
                                [event.target.name]: event.target.checked,
                              },
                            });
                          }}
                          color="primary"
                        />
                      }
                      label="Part Time"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="wfh"
                          checked={searchOptions.jobType.wfh}
                          onChange={(event) => {
                            setSearchOptions({
                              ...searchOptions,
                              jobType: {
                                ...searchOptions.jobType,
                                [event.target.name]: event.target.checked,
                              },
                            });
                          }}
                          color="primary"
                        />
                      }
                      label="Work From Home"
                    />
                  </Grid>
                </Grid>
              </div>
            </Grid>

            <Grid item xs={12}>
              <div className={classes.filterSection}>
                <Typography className={classes.filterTitle}>
                  Salary Range
                </Typography>
                <Slider
                  value={searchOptions.salary}
                  onChange={(event, value) =>
                    setSearchOptions({
                      ...searchOptions,
                      salary: value,
                    })
                  }
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => {
                    return `₹${value * 1000}`;
                  }}
                  marks={[
                    { value: 0, label: "₹0" },
                    { value: 100, label: "₹100k" },
                  ]}
                  color="primary"
                />
              </div>
            </Grid>

            <Grid item xs={12}>
              <div className={classes.filterSection}>
                <Typography className={classes.filterTitle}>
                  Duration (months)
                </Typography>
                <TextField
                  select
                  label="Duration"
                  variant="outlined"
                  fullWidth
                  value={searchOptions.duration}
                  onChange={(event) =>
                    setSearchOptions({
                      ...searchOptions,
                      duration: event.target.value,
                    })
                  }
                >
                  <MenuItem value="0">All</MenuItem>
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                  <MenuItem value="4">4</MenuItem>
                  <MenuItem value="5">5</MenuItem>
                  <MenuItem value="6">6</MenuItem>
                  <MenuItem value="7">7</MenuItem>
                </TextField>
              </div>
            </Grid>

            <Grid item xs={12}>
              <div className={classes.filterSection}>
                <Typography className={classes.filterTitle}>
                  Sort Options
                </Typography>
                <Grid container spacing={1}>
                  {["salary", "duration", "rating"].map((sortType) => (
                    <Grid item xs={4} key={sortType}>
                      <div className={classes.sortOption}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={searchOptions.sort[sortType].status}
                              onChange={(event) =>
                                setSearchOptions({
                                  ...searchOptions,
                                  sort: {
                                    ...searchOptions.sort,
                                    [sortType]: {
                                      ...searchOptions.sort[sortType],
                                      status: event.target.checked,
                                    },
                                  },
                                })
                              }
                              color="primary"
                            />
                          }
                          label={sortType.charAt(0).toUpperCase() + sortType.slice(1)}
                        />
                        <IconButton
                          size="small"
                          disabled={!searchOptions.sort[sortType].status}
                          onClick={() => {
                            setSearchOptions({
                              ...searchOptions,
                              sort: {
                                ...searchOptions.sort,
                                [sortType]: {
                                  ...searchOptions.sort[sortType],
                                  desc: !searchOptions.sort[sortType].desc,
                                },
                              },
                            });
                          }}
                        >
                          {searchOptions.sort[sortType].desc ? (
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

const MyJobs = (props) => {
  const classes = useStyles();
  const [jobs, setJobs] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchOptions, setSearchOptions] = useState({
    query: "",
    jobType: {
      fullTime: false,
      partTime: false,
      wfh: false,
    },
    salary: [0, 100],
    duration: "0",
    sort: {
      salary: {
        status: false,
        desc: false,
      },
      duration: {
        status: false,
        desc: false,
      },
      rating: {
        status: false,
        desc: false,
      },
    },
  });

  const setPopup = useContext(SetPopupContext);
  
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    let searchParams = [`myjobs=1`];
    if (searchOptions.query !== "") {
      searchParams = [...searchParams, `q=${searchOptions.query}`];
    }
    if (searchOptions.jobType.fullTime) {
      searchParams = [...searchParams, `jobType=Full%20Time`];
    }
    if (searchOptions.jobType.partTime) {
      searchParams = [...searchParams, `jobType=Part%20Time`];
    }
    if (searchOptions.jobType.wfh) {
      searchParams = [...searchParams, `jobType=Work%20From%20Home`];
    }
    if (searchOptions.salary[0] != 0) {
      searchParams = [
        ...searchParams,
        `salaryMin=${searchOptions.salary[0] * 1000}`,
      ];
    }
    if (searchOptions.salary[1] != 100) {
      searchParams = [
        ...searchParams,
        `salaryMax=${searchOptions.salary[1] * 1000}`,
      ];
    }
    if (searchOptions.duration != "0") {
      searchParams = [...searchParams, `duration=${searchOptions.duration}`];
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
    let address = apiList.jobs;
    if (queryString !== "") {
      address = `${address}?${queryString}`;
    }

    axios
      .get(address, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setJobs(response.data);
      })
      .catch((err) => {
        console.log(err.response?.data || err.message);
        setPopup({
          open: true,
          severity: "error",
          message: "Error fetching jobs",
        });
      });
  };

  return (
    <div className={classes.root}>
      <Grid container justify="center">
        <Grid item xs={11} md={10} lg={8}>
          {/* Hero Section */}
          <Paper className={classes.heroSection}>
            <div className={classes.searchContainer}>
              <Typography 
                variant="h3" 
                align="center" 
                gutterBottom
                style={{ fontWeight: 700, marginBottom: 32 }}
              >
                My Job Listings
              </Typography>
              
              <Typography 
                variant="h6" 
                align="center" 
                style={{ opacity: 0.9, marginBottom: 32 }}
              >
                Manage and track your posted job opportunities
              </Typography>

              <TextField
                label="Search My Jobs"
                value={searchOptions.query}
                onChange={(event) =>
                  setSearchOptions({
                    ...searchOptions,
                    query: event.target.value,
                  })
                }
                onKeyPress={(ev) => {
                  if (ev.key === "Enter") {
                    getData();
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => getData()}>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                fullWidth
                variant="outlined"
                className={classes.searchField}
                placeholder="Search by job title, skills, or type..."
              />

              <Box textAlign="center">
                <IconButton 
                  onClick={() => setFilterOpen(true)}
                  className={classes.filterButton}
                >
                  <FilterListIcon />
                  <Typography variant="body2" style={{ marginLeft: 8 }}>
                    Advanced Filters
                  </Typography>
                </IconButton>
              </Box>

              {/* Quick Stats */}
              <Grid container spacing={2} style={{ marginTop: 24 }}>
                <Grid item xs={6} sm={3}>
                  <div className={classes.statsCard}>
                    <div className={classes.statsNumber}>{jobs.length}</div>
                    <div className={classes.statsLabel}>Total Jobs</div>
                  </div>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <div className={classes.statsCard}>
                    <div className={classes.statsNumber}>
                      {jobs.filter(job => job.maxPositions > job.acceptedCandidates).length}
                    </div>
                    <div className={classes.statsLabel}>Active</div>
                  </div>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <div className={classes.statsCard}>
                    <div className={classes.statsNumber}>
                      {jobs.reduce((sum, job) => sum + (job.maxApplicants || 0), 0)}
                    </div>
                    <div className={classes.statsLabel}>Total Applicants</div>
                  </div>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <div className={classes.statsCard}>
                    <div className={classes.statsNumber}>
                      {jobs.reduce((sum, job) => sum + (job.acceptedCandidates || 0), 0)}
                    </div>
                    <div className={classes.statsLabel}>Hired</div>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Paper>

          {/* Jobs Section */}
          <Grid container spacing={2}>
            {jobs.length > 0 ? (
              jobs.map((job, index) => (
                <Grid item xs={12} key={job._id || index}>
                  <JobTile job={job} getData={getData} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <div className={classes.noJobsContainer}>
                  <WorkIcon className={classes.noJobsIcon} />
                  <Typography variant="h4" gutterBottom>
                    No Jobs Found
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    You haven't posted any jobs yet, or no jobs match your current search criteria.
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

export default MyJobs;
