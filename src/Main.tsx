import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Navbar } from "./pages/shared/navbar/Navbar";
import { Splash } from "./pages/splash/Splash";
import { QuestionnaireSelection } from "./pages/questionnaire-dashboard/questionnaire-selection/QuestionnaireSelection";
import { Questionnaire } from "./pages/questionnaire-dashboard/questionnaire/Questionnaire";
import { AdminPanel } from "./pages/admin-panel/AdminPanel";
export const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/:role?"
          element={<Navbar childComponent={<Splash />} />}
        />

        <Route
          path="/questionnaire-home"
          element={<QuestionnaireSelection />}
        />
        <Route path="/questionnaire/:id" element={<Questionnaire />} />
        <Route path="/admin-home" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
};
