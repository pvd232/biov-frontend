export class QuestionResponse {
  userId: string;
  questionId: number;
  questionnaireId: number;
  type: string;
  multiOptionIds: number[] | null;

  singleOptionId: number | null;
  shortAnswer: string | null;

  constructor(data: { [key: string]: any }) {
    console.log("data", data);
    this.userId = data["user_id"];
    this.questionId = data["question_id"];
    this.questionnaireId = data["questionnaire_id"];
    this.type = data["type"];
    this.multiOptionIds = data["multi_option_ids"];
    this.singleOptionId = data["single_option_id"];
    this.shortAnswer = data["short_answer"];
  }
}
