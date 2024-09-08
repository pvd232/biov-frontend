import Grid from "@mui/material/Grid2";
import styles from "./scss/Splash.module.scss";
import { Login } from "./login/Login";
export const Splash = () => {
  return (
    <Grid container className={styles.pageContainer}>
      <Login />
    </Grid>
  );
};
