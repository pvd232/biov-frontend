import { Main } from "./Main";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import { customTheme } from "./customTheme";
import { UserContextProvider } from "./context/UserContextProvider";
import { QuestionnaireContextProvider } from "./context/QuestionnaireContextProvider";

export const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <UserContextProvider>
          <QuestionnaireContextProvider>
            <Main />
          </QuestionnaireContextProvider>
        </UserContextProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
