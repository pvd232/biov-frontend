import React, { createContext, useState, useEffect } from "react";
import { QuestionResponseContextType } from "../types/context/QuestionResponseContextType";
import { QuestionResponseContextProviderProps } from "../types/context/QuestionResponseContextProviderProps";
import { APIClient } from "../helpers/APIC";
// import { QuestionResponse } from "../types/domains/QuestionResponse";
import { UserSession } from "./UserSession";
import { QuestionResponse } from "../helpers/QuestionResponse";

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
  const userId = new UserSession().getUserId()!;
  useEffect(() => {
    try {
      APIClient.fetchQuestionResponse(userId).then((response) => {
        if (!response) {
          throw new Error("Failed to fetch questionResponses");
        }

        response.json().then((data) => {
          const questionResponses = data.map(
            (json: any) => new QuestionResponse(json)
          );
          setQuestionResponses(questionResponses);
        });
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);
  return (
    <QuestionResponseContext.Provider
      value={{ questionResponses, loading, error }}
    >
      {children}
    </QuestionResponseContext.Provider>
  );
};
