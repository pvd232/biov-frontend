import { QuestionResponse } from "./QuestionResponse";
import { User } from "../types/domains/User";
import getBaseURL from "./getBaseURL";
class APIC {
  env: string;
  baseUrl: string;
  frontEndBaseUrl: string;
  mode: RequestMode;

  constructor() {
    // Host name will be localhost when running async tests in jest
    if (
      window.location.host === "localhost:3000" ||
      window.location.host === "localhost"
    ) {
      this.env = "debug";
      this.baseUrl = getBaseURL("api");
      this.frontEndBaseUrl = getBaseURL("frontend");
      this.mode = "cors";
    } else {
      this.env = "production";
      this.baseUrl = getBaseURL("api");
      this.frontEndBaseUrl = getBaseURL("frontend");
      this.mode = "same-origin";
    }
  }
  fetchQuestionnaires = async () => {
    const request = new Request(`${this.baseUrl}/questionnaire_junction`, {
      method: "GET",
      mode: this.mode,
    });
    const response = await fetch(request);
    if (!response.ok) {
      throw new Error("Failed to fetch questionnaires");
    }
    return response;
  };
  fetchQuestionResponse = async (userId: string) => {
    const request = new Request(`${this.baseUrl}/question_response/${userId}`, {
      method: "GET",
      mode: this.mode,
    });
    const response = await fetch(request);
    if (!response.ok) {
      throw new Error("Failed to fetch questionnaires");
    }
    return response;
  };
  fetchQuestionnaireStats = async () => {
    const request = new Request(`${this.baseUrl}/questionnaire_stats`, {
      method: "GET",
      mode: this.mode,
    });
    const response = await fetch(request);
    if (!response.ok) {
      throw new Error("Failed to fetch questionnaires");
    }
    return response;
  };
  postQuestionResponse = async (questionResponse: QuestionResponse[]) => {
    const request = new Request(`${this.baseUrl}/question_response`, {
      method: "POST",
      mode: this.mode,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(questionResponse),
    });
    const response = await fetch(request);
    if (!response.ok) {
      throw new Error("Failed to post question response");
    }
    return true;
  };

  authenticateUser = async (user: User) => {
    const request = new Request(`${this.baseUrl}/login`, {
      method: "POST",
      mode: this.mode,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const response = await fetch(request);
    if (!response.ok) {
      return false;
    }
    return true;
  };
}
export const APIClient = new APIC();
