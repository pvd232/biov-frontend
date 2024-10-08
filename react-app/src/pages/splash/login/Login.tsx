import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import styles from "./scss/Login.module.scss";
import { CustomTextField } from "../../shared/custom-text-field/CustomTextField";
import { BlackButton } from "../../shared/button/BlackButton";
import { CircularProgress, Container, Typography } from "@mui/material";
import { useUser } from "../../../hooks/useUser";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../../../types/domains/User";
import { APIClient } from "../../../helpers/APIC";

type LoginParams = {
  role: "admin" | "non-admin" | undefined;
};
export const Login: React.FC = () => {
  const { login } = useUser();
  const { role } = useParams<LoginParams>();
  // State for the form inputs and errors
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [admin, setAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setLoading(true);
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    // Validate the inputs
    if (!trimmedUsername || !trimmedPassword) {
      setError("Username and password cannot be empty or whitespace.");
      return;
    }

    // If validation passes, log the user in
    const user: User = {
      id: trimmedUsername,
      password: trimmedPassword,
      role: role ?? "non-admin",
    };
    APIClient.authenticateUser(user).then((response) => {
      setLoading(false);
      if (!response) {
        setError("Invalid username or password.");
        return;
      } else if (user.role === "non-admin") {
        login(user);
        navigate("/questionnaire-home");
      } else if (user.role === "admin") {
        login(user);
        navigate("/admin-home");
      }
    });
  };

  return (
    <Container className={styles.pageContainer} id="page-container">
      <Grid container id="login-card" className={styles.loginCard}>
        <Grid id="login-card-content" container className={styles.loginContent}>
          <Grid container className={styles.width80}>
            <Typography variant={"h4"}>
              {admin ? "Welcome back, Boss" : "Welcome back"}
            </Typography>
          </Grid>

          {/* Username input */}
          <Grid container className={styles.gridContainer}>
            <CustomTextField
              className={styles.width80}
              label={"Username"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>

          {/* Password input */}
          <Grid container className={styles.gridContainer}>
            <CustomTextField
              className={styles.width80}
              label={"Password"}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>

          {/* Error message */}
          {error && (
            <Grid container className={styles.gridContainer}>
              <Typography color="error">{error}</Typography>
            </Grid>
          )}

          {/* Login button */}
          <Grid container className={styles.loginButtonContainer}>
            <Grid container className={styles.gridContainer}>
              {loading ? (
                <CircularProgress size={24}></CircularProgress>
              ) : (
                <BlackButton
                  className={styles.width80}
                  onClick={handleLoginClick}
                >
                  Login
                </BlackButton>
              )}
            </Grid>
            <Grid>
              <h2>or</h2>
            </Grid>
            <Grid container className={styles.gridContainer}>
              <BlackButton
                className={styles.width80 + " " + styles.changeRoleButton}
                sx={{ backgroundColor: "blue" }}
                onClick={() => {
                  if (admin) {
                    setAdmin(false);
                    navigate("/");
                  } else {
                    setAdmin(true);
                    navigate("/admin");
                  }
                }}
              >
                {admin ? "Go to User Login" : "Go to Admin Login"}
              </BlackButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
