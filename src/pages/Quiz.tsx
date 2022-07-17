import React, { useState } from "react";
import { fetchQuizQuestions, QuestionState } from "../API";
import { useNavigate } from "react-router-dom";
import "./Quiz.css";
//Components
import QuestionCard from "../components/QuestionCard";

//favIcon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { SubjectName } from "./Home";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};
// const TOTAL_QUESTIONS = 10;

function Quiz() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [quizOver, setQuizOver] = useState(true);
  const [quizResult, setQuiResult] = useState(false);
  const [questionNumButton, setQuestionNumButton] = useState(false);
  const [TOTAL_QUESTIONS, setTOTAL_QUESTIONS] = useState(10);

  const navigate = useNavigate();
  // console.log(fetchQuizQuestions(TOTAL_QUESTIONS));

  const startQuizFetching = async () => {
    try {
      setQuiResult(false);
      setLoading(true);

      const newQuestion = await fetchQuizQuestions();
      if (newQuestion) {
        setQuestions(newQuestion);
        setScore(0);
        setUserAnswers([]);
        setNumber(0);
        setQuestionNumButton(true);
        setLoading(false);
      } else {
        throw new Error("Cannot get data");
      }
    } catch (err) {
      console.error(err);
    }
  };
  const startQuiz = (num: number) => {
    // setQuiResult(false);
    setLoading(true);
    setTOTAL_QUESTIONS(num);
    setQuizOver(false);
    setQuestionNumButton(false);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!quizOver) {
      //User Answer
      const answer = e.currentTarget.value;
      //Check answer  against correct answer
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore((prev) => prev + 1);
      //Save answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    //Move on to next question if not the last question

    const nextQuestion = number + 1;
    setNumber(nextQuestion);
  };

  const finishQuiz = () => {
    setQuizOver(true);
    setQuiResult(true);
  };
  const returnClinckHandler = () => {
    navigate("/quiz-app/");
  };

  return (
    <div className="Quiz">
      <h1 className="quiz-name">{SubjectName}</h1>
      <div className="quiz-card">
        {quizResult && (
          <p className="quiz-result">
            <span>
              {score >= TOTAL_QUESTIONS / 2 ? "გილოცავთ, " : "სამწუხაროდ "}{" "}
              თქვენ მიიღეთ /
            </span>
            <br />
            <span>
              {score >= TOTAL_QUESTIONS / 2
                ? " Congratulations, "
                : " Unfortunately "}{" "}
              your score is :
            </span>
            <br /> {score} / {TOTAL_QUESTIONS}
          </p>
        )}
        {questionNumButton && (
          <div className="question-number__container">
            <span>
              აირჩიეთ კითხვათა რაოდენობა / Select the numbers of questions:{" "}
            </span>
            <br />
            <button className="question-number" onClick={() => startQuiz(10)}>
              10
            </button>
            {questions.length > 40 && (
              <button className="question-number" onClick={() => startQuiz(40)}>
                40
              </button>
            )}
            <button
              className="question-number"
              onClick={() => startQuiz(questions.length)}
            >
              {questions.length}
            </button>
          </div>
        )}
        {(SubjectName !== undefined && quizOver && !questionNumButton) ||
        userAnswers.length === TOTAL_QUESTIONS + 1 ? (
          <button className="start" onClick={startQuizFetching}>
            Start
          </button>
        ) : null}
        {!quizOver ? <p className="score">Score: {score}</p> : null}
        {loading && (
          <p className="spinner__container">
            <FontAwesomeIcon icon={faSpinner} className="spinner" /> Loading
            Questions...
          </p>
        )}
        {!loading && !quizOver && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!loading &&
          !quizOver &&
          userAnswers.length === number + 1 &&
          number !== TOTAL_QUESTIONS - 1 && (
            <button className="next" onClick={nextQuestion}>
              Next Question
            </button>
          )}
        {!loading &&
          !quizOver &&
          userAnswers.length === number + 1 &&
          number === TOTAL_QUESTIONS - 1 && (
            <button className="next" onClick={finishQuiz}>
              Finish Quiz
            </button>
          )}
        <br />
        {!loading && quizOver && (
          <button
            className="returnSubjectPage-btn"
            onClick={returnClinckHandler}
          >
            Return to subject selecting page
          </button>
        )}
      </div>
    </div>
  );
}

export default Quiz;
