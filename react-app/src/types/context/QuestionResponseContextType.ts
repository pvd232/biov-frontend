import { QuestionResponse } from "../../helpers/QuestionResponse";
export interface QuestionResponseContextType {
  questionResponses: QuestionResponse[];
  refetch: () => Promise<void>;
  loading: boolean;
  error: string | null;
}
