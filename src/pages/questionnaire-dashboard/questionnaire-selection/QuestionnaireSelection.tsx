import React from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useQuestionnaires } from "../../../hooks/useQuestionnaires";

export const QuestionnaireSelection: React.FC = () => {
  const { questionnaires, loading, error } = useQuestionnaires(); // Use the custom hook to get data from context
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
            {questionnaires.map((questionnaire) => (
              <TableRow key={questionnaire.id}>
                <TableCell>{questionnaire.id}</TableCell>
                <TableCell>{questionnaire.name}</TableCell>
                <TableCell>
                  <Link to={`/questionnaire`} state={{ questionnaire }}>
                    {questionnaire.name}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
