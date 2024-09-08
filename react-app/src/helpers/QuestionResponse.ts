import { QuestionCategory } from "../types/enums/QuestionCategory";

export class QuestionResponse {
  userId: string;
  questionId: number;
  questionnaireId: number;
  type: QuestionCategory;
  multiOptionIds: number[] | null;

  singleOptionId: number | null;
  shortAnswer: string | null;

  constructor(data: { [key: string]: any }) {
    this.userId = data["user_id"];
    this.questionId = data["question_id"];
    this.questionnaireId = data["questionnaire_id"];
    this.type = data["type"];
    this.multiOptionIds = data["multi_option_ids"];
    this.singleOptionId = data["single_option_id"];
    this.shortAnswer = data["short_answer"];
  }
  getAnswer() {
    switch (this.type) {
      case QuestionCategory.MultipleChoiceSelectAll:
        return this.multiOptionIds;
      case QuestionCategory.MultipleChoice:
        return this.singleOptionId;
      case QuestionCategory.ShortAnswer:
        return this.shortAnswer;
    }
  }
}
