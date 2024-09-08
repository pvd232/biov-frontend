import { QuestionnaireResponse } from "./QuestionnaireResponse";

export class QuestionnaireStat {
  userId: number;
  count: number;
  questionnaireResponses: QuestionnaireResponse[];
  constructor(data: { [key: string]: any }) {
    this.userId = data["user_id"];
    this.count = data["count"];
    this.questionnaireResponses = data["questionnaire_responses"].map(
      (questionnaireResponse: { [key: string]: any }) =>
        new QuestionnaireResponse(questionnaireResponse)
    );
  }
}
