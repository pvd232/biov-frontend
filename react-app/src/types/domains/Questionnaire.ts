import { Question } from "./Question";

export interface Questionnaire {
  id: number;
  name: string;
  questions: Question[];
}
