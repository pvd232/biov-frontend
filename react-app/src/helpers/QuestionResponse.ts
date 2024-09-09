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
    this.userId = this.getValue(data, "user_id", "userId");
    this.questionId = this.getValue(data, "question_id", "questionId");
    this.questionnaireId = this.getValue(
      data,
      "questionnaire_id",
      "questionnaireId"
    );
    this.type = data["type"];
    this.multiOptionIds = this.getValue(
      data,
      "multi_option_ids",
      "multiOptionIds"
    );
    this.singleOptionId = this.getValue(
      data,
      "single_option_id",
      "singleOptionId"
    );
    this.shortAnswer = this.getValue(data, "short_answer", "shortAnswer");
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
  getValue(data: { [key: string]: any }, snakeKey: string, camelKey: string) {
    return data[snakeKey] !== undefined ? data[snakeKey] : data[camelKey];
  }
}
