import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Checkbox,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
  LinearProgress,
  Box,
  TextField,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { QuestionCategory } from "../../../types/enums/QuestionCategory";
import { APIClient } from "../../../helpers/APIC";
import { QuestionResponse } from "../../../helpers/QuestionResponse";
import { useUser } from "../../../context/UserContextProvider";
import { QuestionOption } from "../../../types/domains/QuestionOption";
import { useNavigate } from "react-router-dom";
import { useQuestionResponses } from "../../../hooks/useQuestionResponses";

export const Questionnaire: React.FC = () => {
  const navigate = useNavigate();

  const userId = useUser().userId!;
  const prevQuestionResponses = useQuestionResponses();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuestionResponse[]>([]);
  const [errors, setErrors] = useState<Record<number, string>>({});

  // Find the questionnaire using the ID from the URL after ensuring hooks are defined
  const location = useLocation();
  const questionnaire = location.state?.questionnaire;

  useEffect(() => {
    const questionId = questionnaire!.questions[currentQuestionIndex].id;
    for (let response of prevQuestionResponses.questionResponses) {
      if (response.questionId === questionId) {
        console.log("response", response);
        switch (response.type) {
          case QuestionCategory.MultipleChoice:
            setAnswers((prevAnswers) => [
              ...prevAnswers,
              {
                userId: userId,
                questionId: questionId,
                type: QuestionCategory.MultipleChoice,
                singleOptionId: response.singleOptionId,
                multiOptionIds: null,
                shortAnswer: null,
              },
            ]);
            break;
          case QuestionCategory.MultipleChoiceSelectAll:
            console.log("response", response);

            setAnswers((prevAnswers) => [
              ...prevAnswers,
              {
                userId: userId,
                questionId: questionId,
                type: QuestionCategory.MultipleChoice,
                singleOptionId: null,
                multiOptionIds: response.multiOptionIds,
                shortAnswer: null,
              },
            ]);
            break;
          case QuestionCategory.ShortAnswer:
            setAnswers((prevAnswers) => [
              ...prevAnswers,
              {
                userId: userId,
                questionId: questionId,
                type: QuestionCategory.MultipleChoice,
                singleOptionId: null,
                multiOptionIds: null,
                shortAnswer: response.shortAnswer,
              },
            ]);
            break;
        }
      }
    }
  }, [
    currentQuestionIndex,
    questionnaire,
    userId,
    prevQuestionResponses,
    navigate,
  ]);

  const handleAnswerChange = (
    questionId: number,
    answerType: QuestionCategory,
    singleOptionId: number | null,
    multiOptionId: number | null,
    shortAnswer: string | null
  ) => {
    setAnswers((prevAnswers) => {
      const answerIndex = prevAnswers.findIndex(
        (answer) => answer.questionId === questionId
      );

      // Clone the answers to avoid mutating state directly
      const updatedAnswers = [...prevAnswers];

      // Handle multi select questions
      if (
        answerType === QuestionCategory.MultipleChoiceSelectAll &&
        multiOptionId !== null
      ) {
        if (answerIndex > -1 && updatedAnswers[answerIndex].multiOptionIds) {
          // Check if option is already selected
          const optionIndex =
            updatedAnswers[answerIndex].multiOptionIds!.indexOf(multiOptionId);

          if (optionIndex > -1) {
            // Remove the option if it's already selected
            updatedAnswers[answerIndex].multiOptionIds = updatedAnswers[
              answerIndex
            ].multiOptionIds!.filter((id) => id !== multiOptionId);
          } else {
            // Add the option if it's not already selected
            updatedAnswers[answerIndex].multiOptionIds!.push(multiOptionId);
          }
        } else {
          // If the answer doesn't exist, create it with the selected option
          updatedAnswers.push({
            userId: userId,
            questionId: questionId,
            type: answerType,
            singleOptionId: null,
            multiOptionIds: [multiOptionId],
            shortAnswer: null,
          });
        }
      }

      // Handle single select questions
      else if (
        answerType === QuestionCategory.MultipleChoice &&
        singleOptionId != null
      ) {
        if (answerIndex > -1) {
          updatedAnswers[answerIndex].singleOptionId = singleOptionId;
        } else {
          updatedAnswers.push({
            userId: userId,
            questionId: questionId,
            type: answerType,
            singleOptionId: singleOptionId,
            multiOptionIds: null,
            shortAnswer: null,
          });
        }
      }

      // Handle short answer questions
      else if (
        answerType === QuestionCategory.ShortAnswer &&
        shortAnswer != null
      ) {
        if (answerIndex > -1) {
          updatedAnswers[answerIndex].shortAnswer = shortAnswer;
        } else {
          updatedAnswers.push({
            userId: userId,
            questionId: questionId,
            type: answerType,
            singleOptionId: null,
            multiOptionIds: null,
            shortAnswer: shortAnswer,
          });
        }
      }

      return updatedAnswers;
    });
    // Reset error if there was one
    if (errors[questionId])
      setErrors((prevErrors) => ({
        ...prevErrors,
        [questionId]: "",
      }));
  };

  // No empty answers or white space only answers
  const validateAnswer = (questionId: number) => {
    const answer = answers[questionId] || "";
    if (
      answer.type === QuestionCategory.ShortAnswer &&
      (answer.shortAnswer === null || answer.shortAnswer.trim().length === 0)
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [questionId]:
          "This field cannot be empty nor can it be just whitespace.",
      }));
      return false;
    }
    return true;
  };

  const handleNext = () => {
    const currentQuestion = questionnaire!.questions[currentQuestionIndex];
    // Validate short answer questions
    if (
      currentQuestion.type === QuestionCategory.ShortAnswer &&
      !validateAnswer(currentQuestion.id)
    )
      return; // Prevent moving to the next question if validation fails

    if (currentQuestionIndex < questionnaire!.questions.length - 1)
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    else handleSubmit();
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0)
      setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const currentQuestion = questionnaire!.questions[currentQuestionIndex];
  const progress =
    ((currentQuestionIndex + 1) / questionnaire!.questions.length) * 100;

  const handleSubmit = () => {
    APIClient.postQuestionResponse(answers).then(() => {
      navigate("/questionnaire-home");
    });
  };

  return (
    <Container>
      <Typography variant="h4">Questionnaire: {questionnaire!.name}</Typography>
      <Box mt={4}>
        <Typography variant="h6" sx={{ marginBottom: "1vh" }}>
          {currentQuestion.text}
        </Typography>
        <Box mt={2}>
          {currentQuestion.type === QuestionCategory.MultipleChoice ? (
            <RadioGroup
              value={answers[currentQuestionIndex]?.singleOptionId || ""}
              onChange={(e) =>
                handleAnswerChange(
                  currentQuestion.id,
                  QuestionCategory.MultipleChoice,
                  Number(e.target.value),
                  null,
                  null
                )
              }
            >
              {currentQuestion.options?.map((option: QuestionOption) => (
                <FormControlLabel
                  key={option.id}
                  value={option.id}
                  control={<Radio />}
                  label={option.text}
                />
              ))}
            </RadioGroup>
          ) : currentQuestion.type ===
            QuestionCategory.MultipleChoiceSelectAll ? (
            currentQuestion.options?.map((option: QuestionOption) => (
              <FormControlLabel
                key={option.id}
                control={
                  <Checkbox
                    checked={
                      answers[currentQuestionIndex]?.multiOptionIds?.includes(
                        option.id
                      ) || false
                    }
                    onChange={() =>
                      handleAnswerChange(
                        currentQuestion.id,
                        QuestionCategory.MultipleChoiceSelectAll,
                        null,
                        option.id,
                        null
                      )
                    }
                  />
                }
                label={option.text}
              />
            ))
          ) : (
            <TextField
              variant="outlined"
              fullWidth
              value={answers[currentQuestionIndex]?.shortAnswer || ""}
              onChange={(e) => {
                handleAnswerChange(
                  currentQuestion.id,
                  QuestionCategory.ShortAnswer,
                  null,
                  null,
                  e.target.value
                );
              }}
              error={!!errors[currentQuestion.id]}
              helperText={errors[currentQuestion.id]}
              required={true}
            />
          )}
        </Box>
      </Box>

      <Box mt={4} display="flex" justifyContent="space-between">
        <Button
          variant="contained"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>
        <Button variant="contained" onClick={handleNext}>
          Next
        </Button>
      </Box>
      <Box mt={4}>
        <LinearProgress variant="determinate" value={progress} />
        <Typography variant="body2" color="textSecondary">
          {`Progress: ${currentQuestionIndex + 1}/${
            questionnaire!.questions.length
          }`}
        </Typography>
      </Box>
    </Container>
  );
};
