import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import styles from "../scss/SplashLinks.module.scss";
import { useNavigate } from "react-router-dom";

export const SplashLinks = () => {
  const navigate = useNavigate();
  return (
    <Grid container className={styles.splashLinksContainer}>
      <Grid>
        <Button
          id="log-in"
          variant="contained"
          className={styles.dietitianSignupButton}
          onClick={() => navigate("/splash-menu")}
        >
          Log In
        </Button>
      </Grid>
    </Grid>
  );
};
