import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import {
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaMedium,
  FaDesktop,
  FaSun,
  FaMoon,
} from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  footer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(3),
    background: "rgba(255, 255, 255, 0.6)",
    backdropFilter: "blur(10px)",
    color: "#4a5568",
    width: "100%",
    boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.1)",
    borderTop: "1px solid rgba(255, 255, 255, 0.2)",
    transition: "all 0.3s ease",
    "&.dark": {
      background: "rgba(0, 0, 0, 0.6)",
      color: "#e2e8f0",
    },
  },
  findMeText: {
    marginBottom: theme.spacing(1),
    fontSize: "0.875rem",
    fontWeight: 600,
    letterSpacing: "0.5px",
    textTransform: "uppercase",
  },
  socialLinks: {
    display: "flex",
    gap: theme.spacing(2.5),
    fontSize: "1.25rem",
    marginBottom: theme.spacing(2),
  },
  socialLink: {
    color: "inherit",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-2px)",
    },
    "&.linkedin:hover": {
      color: "#0077b5",
    },
    "&.github:hover": {
      color: "#333",
    },
    "&.instagram:hover": {
      color: "#e4405f",
    },
    "&.medium:hover": {
      color: "#000",
    },
  },
  themeToggle: {
    display: "flex",
    background: "#e2e8f0",
    borderRadius: "50px",
    padding: theme.spacing(0.5, 2),
    gap: theme.spacing(3),
    color: "#1a202c",
    "&.dark": {
      background: "#4a5568",
      color: "#ffffff",
    },
  },
  themeButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: theme.spacing(0.5),
    borderRadius: "50%",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
}));

const Footer = () => {
  const classes = useStyles();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.className = isDark ? "dark" : "light";
    } else {
      document.documentElement.className = theme;
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  return (
    <footer className={`${classes.footer} ${theme === "dark" ? "dark" : ""}`}>
      <p className={classes.findMeText}>Find me on:</p>
      <div className={classes.socialLinks}>
        <a 
          href="https://linkedin.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="LinkedIn"
          className={`${classes.socialLink} linkedin`}
        >
          <FaLinkedin />
        </a>
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="GitHub"
          className={`${classes.socialLink} github`}
        >
          <FaGithub />
        </a>
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="Instagram"
          className={`${classes.socialLink} instagram`}
        >
          <FaInstagram />
        </a>
        <a 
          href="https://medium.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="Medium"
          className={`${classes.socialLink} medium`}
        >
          <FaMedium />
        </a>
      </div>

      <div className={`${classes.themeToggle} ${theme === "dark" ? "dark" : ""}`}>
        <button 
          onClick={() => setTheme("system")} 
          title="System"
          className={classes.themeButton}
        >
          <FaDesktop />
        </button>
        <button 
          onClick={() => setTheme("light")} 
          title="Light"
          className={classes.themeButton}
        >
          <FaSun />
        </button>
        <button 
          onClick={() => setTheme("dark")} 
          title="Dark"
          className={classes.themeButton}
        >
          <FaMoon />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
