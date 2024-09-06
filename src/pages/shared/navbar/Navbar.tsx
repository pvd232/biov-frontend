import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { NavbarProps } from "../../../types/pages/NavbarProps";
import navbar from "./scss/Navbar.module.scss";

export const Navbar = (props: NavbarProps) => {
  const navigate = useNavigate();
  const handleClickLogo = () => {
    navigate(props.homeUrl);
  };
  return (
    <Grid container className={navbar.viewContainer}>
      <Grid container className={navbar.childContentContainer}>
        <Grid container className={navbar.navbarContainer}>
          <Box className={navbar.box}>
            <AppBar className={navbar.appBar}>
              <Toolbar className={navbar.toolBar}>
                <Grid container className={navbar.contentTopContainer}>
                  <Grid container className={navbar.contentContainer}>
                    <Grid size={{ xs: 4 }}>
                      <Typography
                        className={navbar.logoText}
                        onClick={handleClickLogo}
                      >
                        Bioverse
                      </Typography>
                    </Grid>
                    {/* <Grid sx={{ marginLeft: "auto", marginRight: "5vw" }}>
                      {props.links}
                    </Grid> */}
                  </Grid>
                </Grid>
              </Toolbar>
            </AppBar>
          </Box>
        </Grid>
        <Grid className={navbar.pageContentContainer}>
          {props.childComponent}
        </Grid>
      </Grid>
    </Grid>
  );
};
