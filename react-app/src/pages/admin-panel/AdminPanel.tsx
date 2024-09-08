import {
  CircularProgress,
  Container,
  Grid2,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useQuestionnaireStats } from "../../hooks/useQuestionnaireStats";
import { QuestionnaireStat } from "../../helpers/QuestionnaireStat";
import styles from "../questionnaire-dashboard/questionnaire-selection/scss/QuestionnaireSelection.module.scss";
import { BlackButton } from "../shared/button/BlackButton";
import { useUser } from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { AdminModal } from "./AdminModal";
export const AdminPanel = () => {
  const { error, loading, questionnaireStats } = useQuestionnaireStats();
  const userContext = useUser();
  const navigate = useNavigate();
  if (error) return <h1>Error in retrieving question responses</h1>;
  else if (loading) return <CircularProgress></CircularProgress>;

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
      <h1>Questionnaire Responses</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Completed Questionnaires</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          {questionnaireStats.map((questionnaireStat: QuestionnaireStat) => (
            <TableRow>
              <TableCell>{questionnaireStat.userId}</TableCell>
              <TableCell>{questionnaireStat.count}</TableCell>
              <TableCell>
                <AdminModal qStat={questionnaireStat}></AdminModal>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </TableContainer>
    </Container>
  );
};
