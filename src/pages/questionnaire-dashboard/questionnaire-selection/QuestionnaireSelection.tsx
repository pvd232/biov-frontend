import React, { useEffect } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Grid2,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQuestionnaires } from "../../../hooks/useQuestionnaires";
import { useQuestionResponses } from "../../../hooks/useQuestionResponses";
import { useUser } from "../../../context/UserContextProvider";
import { BlackButton } from "../../shared/button/BlackButton";
import styles from "./scss/QuestionnaireSelection.module.scss";
export const QuestionnaireSelection: React.FC = () => {
  const { questionnaires, loading, error } = useQuestionnaires(); // Use the custom hook to get data from context
  const { questionResponses, refetch } = useQuestionResponses(); // Add refetch to update context
  const userContext = useUser();
  const location = useLocation(); // Get the location object to access passed state
  const navigate = useNavigate();
  // Check if the user navigated back from completing a questionnaire
  useEffect(() => {
    if (location.state && location.state.fromCompletion) {
      // Refetch the question responses when navigating back after completion
      refetch();
    }
  }, [location.state, refetch]);

  // Collect unique questionnaire IDs from the responses
  const uniqueQuestionnaireIds: Set<number> = new Set();
  for (const qRes of questionResponses) {
    if (!uniqueQuestionnaireIds.has(qRes.questionnaireId)) {
      uniqueQuestionnaireIds.add(qRes.questionnaireId);
    }
  }
  for (const qRes of questionResponses)
    if (!uniqueQuestionnaireIds.has(qRes.questionnaireId))
      uniqueQuestionnaireIds.add(qRes.questionnaireId);
  if (loading) {
    return (
      <Container>
        <h1>Loading...</h1>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <h1>Error: {error}</h1>
      </Container>
    );
  }

  return (
    <Container>
      <Grid2 className={styles.buttonContainer}>
        <Grid2>
          <BlackButton
            variant="contained"
            onClick={() => {
              userContext?.logout();
              navigate("/");
            }}
            className={styles.button}
          >
            Log out
          </BlackButton>
        </Grid2>
      </Grid2>
      <h1>Questionnaires Dashboard</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questionnaires.map((questionnaire, i) => (
              <TableRow key={questionnaire.id}>
                <TableCell>{questionnaire.id}</TableCell>
                <TableCell>{questionnaire.name}</TableCell>
                <TableCell>
                  {uniqueQuestionnaireIds.has(questionnaire.id) ? (
                    <Typography>Questionnaire completed</Typography>
                  ) : (
                    <Link
                      to={`/questionnaire/${questionnaire.id}`}
                      state={{ questionnaire }}
                    >
                      {questionnaire.name}
                    </Link>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
