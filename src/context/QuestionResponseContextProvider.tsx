import React, { createContext, useState, useEffect, useCallback } from "react";
import { QuestionResponseContextType } from "../types/context/QuestionResponseContextType";
import { QuestionResponseContextProviderProps } from "../types/context/QuestionResponseContextProviderProps";
import { APIClient } from "../helpers/APIC";
import { UserSession } from "./UserSession";
import { QuestionResponse } from "../helpers/QuestionResponse";
import { useUser } from "../hooks/useUser";

export const QuestionResponseContext = createContext<
  QuestionResponseContextType | undefined
>(undefined);

export const QuestionResponseContextProvider: React.FC<
  QuestionResponseContextProviderProps
> = ({ children }) => {
  const [questionResponses, setQuestionResponses] = useState<
    QuestionResponse[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const userId = useUser().userId ?? new UserSession().getUserId()!;

  // Define a function to fetch the question responses (can be reused for refetch)
  const fetchQuestionResponses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await APIClient.fetchQuestionResponse(userId);
      if (!response) {
        throw new Error("Failed to fetch question responses");
      }
      const data = await response.json();
      const questionResponses = data.map(
        (json: any) => new QuestionResponse(json)
      );
      setQuestionResponses(questionResponses);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Automatically fetch data on mount
  useEffect(() => {
    fetchQuestionResponses();
  }, [fetchQuestionResponses]);

  return (
    <QuestionResponseContext.Provider
      value={{
        questionResponses,
        loading,
        error,
        refetch: fetchQuestionResponses,
      }}
    >
      {children}
    </QuestionResponseContext.Provider>
  );
};
