import { Questionnaire } from "../domains/Questionnaire";
export interface QuestionnaireContextType {
  questionnaires: Questionnaire[];
  loading: boolean;
  error: string | null;
}
