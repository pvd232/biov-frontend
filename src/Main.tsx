import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Navbar } from "./pages/shared/navbar/Navbar";
import { Splash } from "./pages/splash/Splash";
import { SplashLinks } from "./pages/shared/navbar/links/splash/SplashLinks";
import { QuestionnaireSelection } from "./pages/questionnaire-dashboard/questionnaire-selection/QuestionnaireSelection";
import { Questionnaire } from "./pages/questionnaire-dashboard/questionnaire/Questionnaire";
import { QuestionResponseContextProvider } from "./context/QuestionResponseContextProvider";
export const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Navbar
              childComponent={<Splash />}
              links={<SplashLinks />}
              homeUrl={"/"}
            />
          }
        />

        <Route
          path="/questionnaire-home"
          element={<QuestionnaireSelection />}
        />
        <Route
          path="/questionnaire"
          element={
            <QuestionResponseContextProvider>
              <Questionnaire />
            </QuestionResponseContextProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
