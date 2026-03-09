import { Grid, Typography, makeStyles } from "@material-ui/core";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import {
  Briefcase,
  Users,
  Building,
  TrendingUp,
  Star,
  ArrowRight,
} from "lucide-react";
import isAuth, { userType } from "../lib/isAuth";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    width: "100%",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    position: "relative",
    overflow: "hidden",
  },
  heroSection: {
    width: "100%",
    position: "relative",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    overflow: "hidden",
    paddingTop: theme.spacing(8),
  },
  backgroundPattern: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    opacity: 0.1,
    "& .blob": {
      position: "absolute",
      borderRadius: "50%",
      mixBlendMode: "multiply",
      filter: "blur(40px)",
      opacity: 0.7,
      animation: "$blob 7s infinite",
    },
    "& .blob1": {
      top: "25%",
      left: "25%",
      width: 384,
      height: 384,
      backgroundColor: "white",
    },
    "& .blob2": {
      top: "33%",
      right: "25%",
      width: 384,
      height: 384,
      backgroundColor: "#a855f7",
      animationDelay: "2s",
    },
    "& .blob3": {
      bottom: "25%",
      left: "50%",
      width: 384,
      height: 384,
      backgroundColor: "#3b82f6",
      animationDelay: "4s",
    },
  },
  heroContent: {
    position: "relative",
    zIndex: 1,
    width: "100%",
    padding: theme.spacing(0, 4, 12, 4),
    maxWidth: 1200,
    margin: "0 auto",
    textAlign: "center",
  },
  badgeContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(3),
  },
  badge: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    borderRadius: 50,
    padding: theme.spacing(1, 2),
    color: "white",
    fontSize: "0.875rem",
    fontWeight: 500,
  },
  heroTitle: {
    fontWeight: 700,
    fontSize: "clamp(3rem, 8vw, 7rem)",
    color: "white",
    marginBottom: theme.spacing(3),
    lineHeight: 1.1,
  },
  gradientText: {
    display: "block",
    background: "linear-gradient(to right, #60a5fa, #a855f7)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  heroSubtitle: {
    fontSize: "1.25rem",
    color: "#bfdbfe",
    marginBottom: theme.spacing(5),
    maxWidth: 512,
    margin: `0 auto ${theme.spacing(5)}px auto`,
    lineHeight: 1.6,
  },
  tagsContainer: {
    position: "relative",
    width: "100%",
    overflow: "hidden",
    padding: theme.spacing(2, 0),
    marginBottom: theme.spacing(4),
  },
  tagsScroll: {
    display: "flex",
    gap: theme.spacing(2),
    animation: "$scroll 30s linear infinite",
    width: "max-content",
  },
  tag: {
    whiteSpace: "nowrap",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
    color: "white",
    fontSize: "0.875rem",
    padding: theme.spacing(1, 2),
    borderRadius: 50,
    border: "1px solid rgba(255, 255, 255, 0.3)",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.3)",
    },
  },
  fadeEdge: {
    position: "absolute",
    top: 0,
    height: "100%",
    width: 96,
    pointerEvents: "none",
    zIndex: 10,
    "&.left": {
      left: 0,
      background: "linear-gradient(to right, #667eea, transparent)",
    },
    "&.right": {
      right: 0,
      background: "linear-gradient(to left, #667eea, transparent)",
    },
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(2),
    marginBottom: theme.spacing(8),
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
    },
  },
  primaryButton: {
    backgroundColor: "white",
    color: "#667eea",
    padding: theme.spacing(2, 4),
    borderRadius: theme.spacing(1.5),
    fontWeight: 600,
    fontSize: "1rem",
    textTransform: "none",
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    transition: "all 0.3s ease",
    border: "none",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#f0f8ff",
      transform: "scale(1.05)",
    },
  },
  secondaryButton: {
    border: "2px solid white",
    color: "white",
    backgroundColor: "transparent",
    padding: theme.spacing(2, 4),
    borderRadius: theme.spacing(1.5),
    fontWeight: 600,
    fontSize: "1rem",
    textTransform: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "white",
      color: "#667eea",
    },
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: theme.spacing(4),
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "repeat(4, 1fr)",
    },
  },
  statItem: {
    textAlign: "center",
  },
  statIcon: {
    width: 32,
    height: 32,
    color: "#93c5fd",
    margin: "0 auto",
    marginBottom: theme.spacing(1),
  },
  statValue: {
    fontSize: "2rem",
    fontWeight: 700,
    color: "white",
    marginBottom: theme.spacing(0.5),
  },
  statLabel: {
    color: "#bfdbfe",
    fontSize: "0.875rem",
  },
  "@keyframes blob": {
    "0%": {
      transform: "translate(0px, 0px) scale(1)",
    },
    "33%": {
      transform: "translate(30px, -50px) scale(1.1)",
    },
    "66%": {
      transform: "translate(-20px, 20px) scale(0.9)",
    },
    "100%": {
      transform: "translate(0px, 0px) scale(1)",
    },
  },
  "@keyframes scroll": {
    "0%": {
      transform: "translateX(0)",
    },
    "100%": {
      transform: "translateX(-50%)",
    },
  },
}));

const tagPool = [
  "React", "TypeScript", "JavaScript", "Node.js", "Python", "Java",
  "UI/UX Design", "Product Management", "Data Science", "DevOps",
  "Machine Learning", "Cloud Computing", "Mobile Development",
  "Blockchain", "Cybersecurity", "Full Stack", "Frontend",
  "Backend", "GraphQL", "MongoDB",
];

const AnimatedTags = ({ classes }) => (
  <div className={classes.tagsContainer}>
    <div className={classes.tagsScroll}>
      {[...tagPool, ...tagPool].map((tag, i) => (
        <div key={i} className={classes.tag}>
          #{tag}
        </div>
      ))}
    </div>
    <div className={`${classes.fadeEdge} left`} />
    <div className={`${classes.fadeEdge} right`} />
  </div>
);

const Welcome = () => {
  const classes = useStyles();
  const history = useHistory();

  const stats = [
    { icon: Briefcase, label: "Active Jobs", value: "5,000+" },
    { icon: Users, label: "Companies", value: "1,200+" },
    { icon: Building, label: "Success Stories", value: "10,000+" },
    { icon: TrendingUp, label: "Growth Rate", value: "95%" },
  ];

  const handlePostJob = () => {
    if (userType() === "recruiter") {
      history.push("/addjob");
    } else {
      alert("Only recruiters can post jobs!");
    }
  };

  return (
    <div className={classes.root}>
      <main style={{ paddingTop: 64 }}>
        <section className={classes.heroSection}>
          <div className={classes.backgroundPattern}>
            <div className="blob blob1" />
            <div className="blob blob2" />
            <div className="blob blob3" />
          </div>

          <div className={classes.heroContent}>
            <div className={classes.badgeContainer}>
              <div className={classes.badge}>
                <Star style={{ width: 20, height: 20, color: "#fbbf24" }} />
                <span>#1 Job Portal Platform</span>
              </div>
            </div>

            <Typography className={classes.heroTitle}>
              Find Your Dream
              <span className={classes.gradientText}>
                Career Today
              </span>
            </Typography>

            <Typography className={classes.heroSubtitle}>
              Connect with top companies and discover opportunities that match your
              skills and aspirations. Your next career move starts here.
            </Typography>

            <AnimatedTags classes={classes} />

            <div className={classes.buttonContainer}>
              <button
                onClick={() => history.push("/home")}
                className={classes.primaryButton}
              >
                <span>Explore Jobs</span>
                <ArrowRight style={{ width: 20, height: 20 }} />
              </button>

              {userType() === "recruiter" && (
                <button
                  onClick={handlePostJob}
                  className={classes.secondaryButton}
                >
                  Post a Job
                </button>
              )}
            </div>

            <div className={classes.statsGrid}>
              {stats.map((stat, idx) => (
                <div key={idx} className={classes.statItem}>
                  <stat.icon className={classes.statIcon} />
                  <div className={classes.statValue}>{stat.value}</div>
                  <div className={classes.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export const ErrorPage = () => {
  const classes = useStyles();
  
  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{
        padding: 24,
        minHeight: "93vh",
        background: "linear-gradient(135deg, #fee2e2 0%, #fce7f3 100%)",
      }}
    >
      <Grid item>
        <div style={{ textAlign: "center" }}>
          <Typography
            variant="h2"
            style={{
              fontSize: "clamp(2rem, 5vw, 5rem)",
              fontWeight: 700,
              color: "#dc2626",
              marginBottom: 16,
            }}
          >
            Error 404
          </Typography>
          <Typography style={{ fontSize: "1.125rem", color: "#6b7280" }}>
            Page not found. Please return to the homepage.
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
};

export default Welcome;
