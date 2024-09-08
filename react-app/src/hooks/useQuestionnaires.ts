import { useContext } from "react";
import { QuestionnaireContext } from "../context/QuestionnaireContextProvider";

export const useQuestionnaires = () => {
  const context = useContext(QuestionnaireContext);
  if (!context) {
    throw new Error(
      "useQuestionnaires must be used within a QuestionnaireProvider"
    );
  }
  return context;
};
