import { Main } from "./Main";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import { customTheme } from "./customTheme";
import { UserContextProvider } from "./context/UserContextProvider";
import { QuestionnaireContextProvider } from "./context/QuestionnaireContextProvider";
import { QuestionResponseContextProvider } from "./context/QuestionResponseContextProvider";

export const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <UserContextProvider>
          <QuestionnaireContextProvider>
            <QuestionResponseContextProvider>
              <Main />
            </QuestionResponseContextProvider>
          </QuestionnaireContextProvider>
        </UserContextProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
