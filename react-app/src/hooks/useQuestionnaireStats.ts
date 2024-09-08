import { useContext } from "react";
import { QuestionnaireStatsContext } from "../context/QuestionnaireStatsContextProvider";

export const useQuestionnaireStats = () => {
  const context = useContext(QuestionnaireStatsContext);
  if (!context) {
    throw new Error(
      "useQuestionnaireStats must be used within a QuestionnaireStatsProvider"
    );
  }
  return context;
};
