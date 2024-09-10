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
  CircularProgress,
} from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import { QuestionCategory } from "../../../types/enums/QuestionCategory";
import { APIClient } from "../../../helpers/APIC";
import { QuestionResponse } from "../../../helpers/QuestionResponse";
import { useUser } from "../../../context/UserContextProvider";
import { QuestionOption } from "../../../types/domains/QuestionOption";
import { useNavigate } from "react-router-dom";
import { useQuestionResponses } from "../../../hooks/useQuestionResponses";

type QuestionnaireParams = {
  id: string;
};

export const Questionnaire: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<QuestionnaireParams>();
  const userId = useUser().userId!;
  const prevResponses = useQuestionResponses().questionResponses;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<number, QuestionResponse>>(
    new Map()
  );
  const [errors, setErrors] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState<boolean>(false);

  // Find the questionnaire using the ID from the URL after ensuring hooks are defined
  const location = useLocation();
  const questionnaire = location.state?.questionnaire;

  useEffect(() => {
    // Check previous responses to see if there are any answers to pre-fill
    const uniqueQuestionIds = new Set<number>();
    if (prevResponses && questionnaire) {
      // Get all unique question IDs in the questionnaire
      for (const question of questionnaire.questions) {
        if (!uniqueQuestionIds.has(question.id))
          uniqueQuestionIds.add(question.id);
      }

      const newAnswers = new Map<number, QuestionResponse>();
      prevResponses.forEach((response) => {
        // Check if the response questionId is in the current questionnaire
        if (uniqueQuestionIds.has(response.questionId)) {
          const copiedResponse = new QuestionResponse(response);
          copiedResponse.questionnaireId = Number(id);
          newAnswers.set(response.questionId, copiedResponse);
        }
      });
      setAnswers(newAnswers);
    }
  }, [prevResponses, id, questionnaire]);

  const handleAnswerChange = (
    questionId: number,
    answerType: QuestionCategory,
    singleOptionId: number | null,
    multiOptionId: number | null,
    shortAnswer: string | null
  ) => {
    setAnswers((prevAnswers) => {
      const relevantAnswer = prevAnswers.get(questionId);

      // Clone the answers to avoid mutating state directly, will return empty array if there are no answers
      const updatedAnswers: Map<number, QuestionResponse> = new Map(
        prevAnswers
      );

      // Handle multi select questions
      if (
        answerType === QuestionCategory.MultipleChoiceSelectAll &&
        multiOptionId !== null
      ) {
        if (relevantAnswer && relevantAnswer.multiOptionIds) {
          // Check if option is already selected
          const optionIndex =
            relevantAnswer.multiOptionIds!.indexOf(multiOptionId);
          if (optionIndex > -1) {
            // Remove the option if it's already selected
            relevantAnswer.multiOptionIds =
              relevantAnswer.multiOptionIds!.filter(
                (id) => id !== multiOptionId
              );
          } else {
            // Add the option if it's not already selected
            relevantAnswer.multiOptionIds!.push(multiOptionId);
          }
        } else {
          // If the answer doesn't exist, create it with the selected option
          updatedAnswers.set(
            questionId,
            new QuestionResponse({
              userId: userId,
              questionId: questionId,
              questionnaireId: Number(id),
              type: answerType,
              singleOptionId: null,
              multiOptionIds: [multiOptionId],
              shortAnswer: null,
            })
          );
        }
      }

      // Handle single select questions
      else if (
        answerType === QuestionCategory.MultipleChoice &&
        singleOptionId != null
      ) {
        if (relevantAnswer) {
          relevantAnswer.singleOptionId = singleOptionId;
        } else {
          updatedAnswers.set(
            questionId,
            new QuestionResponse({
              userId: userId,
              questionId: questionId,
              questionnaireId: Number(id),
              type: answerType,
              singleOptionId: singleOptionId,
              multiOptionIds: null,
              shortAnswer: null,
            })
          );
        }
      }

      // Handle short answer questions
      else if (
        answerType === QuestionCategory.ShortAnswer &&
        shortAnswer != null
      ) {
        if (relevantAnswer) {
          relevantAnswer.shortAnswer = shortAnswer;
        } else {
          updatedAnswers.set(
            questionId,
            new QuestionResponse({
              userId: userId,
              questionId: questionId,
              questionnaireId: Number(id),
              type: answerType,
              singleOptionId: null,
              multiOptionIds: null,
              shortAnswer: shortAnswer,
            })
          );
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
    const answer = answers.get(questionId);
    if (
      answer &&
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
    setLoading(true);

    // Convert answers map to array
    const answersArray = Array.from(answers).map(([key, value]) => value);
    APIClient.postQuestionResponse(answersArray).then(() => {
      setLoading(false);
      navigate("/questionnaire-home", {
        state: { fromCompletion: true },
      });
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
              value={answers.get(currentQuestion.id)?.singleOptionId || ""}
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
                      answers
                        .get(currentQuestion.id)
                        ?.multiOptionIds?.includes(option.id) || false
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
              value={answers.get(currentQuestion.id)?.shortAnswer || ""}
              onChange={(e) => {
                handleAnswerChange(
                  currentQuestion.id,
                  QuestionCategory.ShortAnswer,
                  null,
                  null,
                  e.target.value
                );
              }}
              error={errors[currentQuestion.id] ? true : false}
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
        {loading ? (
          <CircularProgress size={24}></CircularProgress>
        ) : (
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        )}
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
