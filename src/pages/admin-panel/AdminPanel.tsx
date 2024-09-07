import {
  CircularProgress,
  Container,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useQuestionnaireStats } from "../../hooks/useQuestionnaireStats";
import { QuestionResponse } from "../../helpers/QuestionResponse";
import { QuestionnaireStat } from "../../helpers/QuestionnaireStat";

export const AdminPanel = () => {
  const { error, loading, questionnaireStats } = useQuestionnaireStats();
  if (error) return <h1>Error in retrieving question responses</h1>;
  else if (loading) return <CircularProgress></CircularProgress>;

  return (
    <Container>
      <h1>Questionnaire Responses</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Completed Questionnaires</TableCell>
            </TableRow>
          </TableHead>
          {questionnaireStats.map((questionnaireStat: QuestionnaireStat) => (
            <TableRow>
              <TableCell>{questionnaireStat.userId}</TableCell>
              <TableCell>{}</TableCell>
            </TableRow>
          ))}
        </Table>
      </TableContainer>
    </Container>
  );
};
