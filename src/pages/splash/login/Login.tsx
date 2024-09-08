import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import styles from "./scss/Login.module.scss";
import { CustomTextField } from "../../shared/custom-text-field/CustomTextField";
import { BlackButton } from "../../shared/button/BlackButton";
import { Container, Typography } from "@mui/material";
import { useUser } from "../../../hooks/useUser";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../../../types/domains/User";
import { APIClient } from "../../../helpers/APIC";

type LoginParams = {
  role: "admin" | undefined;
};
export const Login: React.FC = () => {
  const { login } = useUser();
  const { role } = useParams<LoginParams>();
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
    const user: User = {
      id: trimmedUsername,
      password: trimmedPassword,
      role: role ?? "non-admin",
    };
    APIClient.authenticateUser(user).then((response) => {
      if (!response) {
        setError("Invalid username or password.");
        return;
      } else if (user.role === "non-admin") {
        login(user); // Set the user in context after a successful login
        navigate("/questionnaire-home");
      } else if (user.role === "admin") {
        login(user); // Set the user in context after a successful login
        navigate("/admin-home");
      }
    });
  };

  return (
    <Container className={styles.pageContainer} id="page-container">
      <Grid container id="login-card" className={styles.loginCard}>
        <Grid id="login-card-content" container className={styles.loginContent}>
          <Grid container width={"80%"}>
            <Typography variant={"h4"}>Welcome back, Boss</Typography>
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
          <Grid
            container
            width={"100%"}
            alignItems={"center"}
            flexDirection={"column"}
          >
            <Grid container width={"100%"} justifyContent={"center"}>
              <BlackButton sx={{ width: "80%" }} onClick={handleLoginClick}>
                Login
              </BlackButton>
            </Grid>
            <Grid>
              <h2>or</h2>
            </Grid>
            <Grid container width={"100%"} justifyContent={"center"}>
              <BlackButton
                sx={{ width: "80%" }}
                onClick={() => navigate("/admin")}
              >
                Admin Login
              </BlackButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
