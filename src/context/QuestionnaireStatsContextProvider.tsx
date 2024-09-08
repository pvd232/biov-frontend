import React, { createContext, useState, useEffect } from "react";
import { APIClient } from "../helpers/APIC";
import { UserSession } from "./UserSession";
import { useUser } from "../hooks/useUser";
import { QuestionnaireStatsContextType } from "../types/context/QuestionnaireStatsContextType";
import { QuestionnaireStatsContextProviderProps } from "../types/context/QuestionnaireStatsContextProviderProps";
import { QuestionnaireStat } from "../helpers/QuestionnaireStat";
export const QuestionnaireStatsContext = createContext<
  QuestionnaireStatsContextType | undefined
>(undefined);

export const QuestionnaireStatsContextProvider: React.FC<
  QuestionnaireStatsContextProviderProps
> = ({ children }) => {
  const [questionnaireStats, setQuestionnaireStats] = useState<
    QuestionnaireStat[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const userId = useUser().userId ?? new UserSession().getUserId()!;

  // Automatically fetch data on mount
  useEffect(() => {
    setLoading(true);
    setError(null);
    try {
      APIClient.fetchQuestionnaireStats().then((response) => {
        if (!response) {
          throw new Error("Failed to fetch question responses");
        }
        response.json().then((data) => {
          const questionnaireStatsData = data.map(
            (json: any) => new QuestionnaireStat(json)
          );
          setQuestionnaireStats(questionnaireStatsData);
        });
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  return (
    <QuestionnaireStatsContext.Provider
      value={{
        questionnaireStats,
        loading,
        error,
      }}
    >
      {children}
    </QuestionnaireStatsContext.Provider>
  );
};
