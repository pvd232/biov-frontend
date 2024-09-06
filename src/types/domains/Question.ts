import { QuestionCategory } from "../enums/QuestionCategory";
import { QuestionOption } from "./QuestionOption";

export interface Question {
  id: number;
  text: string;
  type: QuestionCategory;
  options: QuestionOption[];
}
