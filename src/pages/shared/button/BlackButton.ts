import { colors } from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";

export const BlackButton = styled(Button)(() => ({
  backgroundColor: colors.common.black,
  color: colors.common.white,
  textTransform: "none",
  // padding: "15px",
  fontSize: "1.25rem",
}));
