import { useContext } from "react";
import { QuestionResponseContext } from "../context/QuestionResponseContextProvider";

export const useQuestionResponses = () => {
  const context = useContext(QuestionResponseContext);
  if (!context) {
    throw new Error(
      "useQuestionResponses must be used within a QuestionResponseProvider"
    );
  }
  return context;
};
