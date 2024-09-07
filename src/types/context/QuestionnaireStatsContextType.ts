import { QuestionnaireStat } from "../../helpers/QuestionnaireStat";
export interface QuestionnaireStatsContextType {
  questionnaireStats: QuestionnaireStat[];
  loading: boolean;
  error: string | null;
}
