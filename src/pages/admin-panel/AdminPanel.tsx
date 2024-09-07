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
import { useQuestionResponses } from "../../hooks/useQuestionResponses";
import { QuestionResponse } from "../../helpers/QuestionResponse";

export const AdminPanel = () => {
  const { error, loading, questionResponses } = useQuestionResponses();
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
          {questionResponses.map((questionResponse: QuestionResponse) => (
            <TableRow>
              <TableCell>{questionResponse.userId}</TableCell>
              <TableCell>{}</TableCell>
            </TableRow>
          ))}
        </Table>
      </TableContainer>
    </Container>
  );
};
