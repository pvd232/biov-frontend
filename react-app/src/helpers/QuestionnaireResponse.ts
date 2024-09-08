import { AdminQuestionResponse } from "./AdminQuestionResponse";

export class QuestionnaireResponse {
  questionnaireId: number;
  questionResponses: AdminQuestionResponse[];
  constructor(data: { [key: string]: any }) {
    this.questionnaireId = data["questionnaire_id"];
    this.questionResponses = data["question_responses"].map(
      (response: { [key: string]: any }) => new AdminQuestionResponse(response)
    );
  }
}
