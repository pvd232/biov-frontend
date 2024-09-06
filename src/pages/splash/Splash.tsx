import Grid2 from "@mui/material/Grid2";
import styles from "./scss/Splash.module.scss";
import { Login } from "./login/Login";
export const Splash = () => {
  return (
    <Grid2 container className={styles.pageContainer}>
      <Login />
    </Grid2>
  );
};
