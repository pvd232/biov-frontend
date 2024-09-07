import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Navbar } from "./pages/shared/navbar/Navbar";
import { Splash } from "./pages/splash/Splash";
import { SplashLinks } from "./pages/shared/navbar/links/splash/SplashLinks";
import { QuestionnaireSelection } from "./pages/questionnaire-dashboard/questionnaire-selection/QuestionnaireSelection";
import { Questionnaire } from "./pages/questionnaire-dashboard/questionnaire/Questionnaire";
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
        <Route path="/questionnaire/:id" element={<Questionnaire />} />
      </Routes>
    </BrowserRouter>
  );
};
