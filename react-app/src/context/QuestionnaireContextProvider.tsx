import React, { createContext, useState, useEffect } from "react";
import { QuestionnaireContextType } from "../types/context/QuestionnaireContextType";
import { QuestionnaireProviderProps } from "../types/context/QuestionnaireContextProviderProps";
import { APIClient } from "../helpers/APIC";
import { Questionnaire } from "../types/domains/Questionnaire";

export const QuestionnaireContext = createContext<
  QuestionnaireContextType | undefined
>(undefined);

export const QuestionnaireContextProvider: React.FC<
  QuestionnaireProviderProps
> = ({ children }) => {
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      APIClient.fetchQuestionnaires().then((response) => {
        if (!response) {
          throw new Error("Failed to fetch questionnaires");
        }

        response.json().then((data) => {
          const questionnaires = data.map(
            (questionnaire: any) => questionnaire as Questionnaire
          );
          setQuestionnaires(questionnaires);
        });
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);
  return (
    <QuestionnaireContext.Provider value={{ questionnaires, loading, error }}>
      {children}
    </QuestionnaireContext.Provider>
  );
};
