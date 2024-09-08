import { QuestionCategory } from "../types/enums/QuestionCategory";
import { QuestionResponse } from "./QuestionResponse";

export class AdminQuestionResponse extends QuestionResponse {
  questionText: string;
  optionText: string;
  multiOptions: string[];

  constructor(data: { [key: string]: any }) {
    super(data);
    this.questionText = data["question_text"];
    this.optionText = data["option_text"];
    this.multiOptions = data["multi_options"];
  }
  getAnswerValue() {
    switch (this.type) {
      case QuestionCategory.ShortAnswer:
        return super.getAnswer();
      case QuestionCategory.MultipleChoice:
        return this.optionText;
      case QuestionCategory.MultipleChoiceSelectAll:
        return this.multiOptions.join(", ");
      // return this.op
    }
  }
}
