export class QuestionResponse {
  userId: string;
  questionId: number;
  type: string;
  multiOptionIds: number[] | null;

  singleOptionId: number | null;
  shortAnswer: string | null;

  constructor(data: { [key: string]: any }) {
    this.userId = data["user_id"];
    this.questionId = data["question_id"];
    this.multiOptionIds = data["multi_option_ids"];
    this.singleOptionId = data["single_option_id"];
    this.shortAnswer = data["short_answer"];
    this.type = data["type"];
  }
}
