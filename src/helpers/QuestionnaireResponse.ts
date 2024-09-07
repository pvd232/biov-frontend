import { QuestionResponse } from "./QuestionResponse";

export class QuestionnaireResponse {
  questionnaireId: number;
  questionResponses: QuestionResponse[];
  constructor(data: { [key: string]: any }) {
    this.questionnaireId = data["questionnaire_id"];
    this.questionResponses = data["question_responses"].map(
      (response: { [key: string]: any }) => new QuestionResponse(response)
    );
  }
}
