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
    // Handle snake case and camel case
    this.userId = data["user_id"] ?? data["userId"];
    this.questionId = data["question_id"] ?? data["questionId"];
    this.questionnaireId = data["questionnaire_id"] ?? data["questionnaireId"];
    this.type = data["type"];
    this.multiOptionIds = data["multi_option_ids"] ?? data["multiOptionIds"];
    this.singleOptionId = data["single_option_id"] ?? data["singleOptionId"];
    this.shortAnswer = data["short_answer"] ?? data["shortAnswer"];
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
