import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import styles from "./scss/Login.module.scss";
import { CustomTextField } from "../../shared/custom-text-field/CustomTextField";
import { BlackButton } from "../../shared/button/BlackButton";
import { Container, Typography } from "@mui/material";
import { useUser } from "../../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { User } from "../../../types/domains/User";
import { APIClient } from "../../../helpers/APIC";
export const Login: React.FC = () => {
  const { login } = useUser();

  // State for the form inputs and errors
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleLoginClick = () => {
    // Trim input values to remove leading/trailing whitespace
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    // Validate the inputs
    if (!trimmedUsername || !trimmedPassword) {
      setError("Username and password cannot be empty or whitespace.");
      return;
    }

    // If validation passes, log the user in
    const user: User = { id: trimmedUsername, password: trimmedPassword };
    APIClient.authenticateUser(user).then((response) => {
      if (!response) {
        setError("Invalid username or password.");
        return;
      } else {
        login(user); // Set the user in context after a successful login
        navigate("/questionnaire-home");
      }
    });
  };

  return (
    <Container className={styles.pageContainer} id="page-container">
      <Grid container id="login-card" className={styles.loginCard}>
        <Grid id="login-card-content" container className={styles.loginContent}>
          <Grid container width={"80%"}>
            <Typography variant={"h4"}>Welcome back</Typography>
          </Grid>

          {/* Username input */}
          <Grid container width={"100%"} justifyContent={"center"}>
            <CustomTextField
              sx={{ width: "80%" }}
              label={"Username"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>

          {/* Password input */}
          <Grid container width={"100%"} justifyContent={"center"}>
            <CustomTextField
              sx={{ width: "80%" }}
              label={"Password"}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>

          {/* Error message */}
          {error && (
            <Grid container width={"100%"} justifyContent={"center"}>
              <Typography color="error">{error}</Typography>
            </Grid>
          )}

          {/* Login button */}
          <Grid container width={"100%"} justifyContent={"center"}>
            <BlackButton sx={{ width: "80%" }} onClick={handleLoginClick}>
              Login
            </BlackButton>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
