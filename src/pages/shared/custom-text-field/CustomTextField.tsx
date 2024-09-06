import { grey } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";
export const CustomTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: grey[500],
    },
    backgroundColor: "#fcfcfb",
  },
}));
