import { QuestionResponse } from "../../helpers/QuestionResponse";
export interface QuestionResponseContextType {
  questionResponses: QuestionResponse[];
  loading: boolean;
  error: string | null;
}
