import { Main } from "./Main";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import { customTheme } from "./customTheme";
import { UserContextProvider, useUser } from "./context/UserContextProvider";
import { QuestionnaireContextProvider } from "./context/QuestionnaireContextProvider";
import { QuestionnaireStatsContextProvider } from "./context/QuestionnaireStatsContextProvider";
import { QuestionResponseContextProvider } from "./context/QuestionResponseContextProvider";

export const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <UserContextProvider>
          <ConditionalContextWrapper />
        </UserContextProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
// Wrapper to conditionally load contexts based on user role
const ConditionalContextWrapper = () => {
  const { role } = useUser();

  return role === "admin" ? (
    <AdminContextProviders />
  ) : (
    <NonAdminContextProviders />
  );
};
// Context providers for admin users
const AdminContextProviders = () => (
  <QuestionnaireStatsContextProvider>
    <Main />
  </QuestionnaireStatsContextProvider>
);

// Context providers for non-admin users
const NonAdminContextProviders = () => (
  <QuestionnaireContextProvider>
    <QuestionResponseContextProvider>
      <Main />
    </QuestionResponseContextProvider>
  </QuestionnaireContextProvider>
);
// Loading screen or fallback while determining user role
