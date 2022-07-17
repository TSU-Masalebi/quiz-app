import React from "react";

//Types
import { AnswerObject } from "../pages/Quiz";
//Styles
import "./QuestionCard.css";
// import { Wrapper, ButtonWrapper } from "./QuestionCard.Styles";

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNr: number;
  totalQuestions: number;
};

const QuestonCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
}) => (
  <div className="question-card__container">
    <p className="number">
      Question: {questionNr} / {totalQuestions}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question }} className="question" />
    <div className="multiple-options__container">
      {answers.map((answer) => (
        <button
          key={answer}
          disabled={userAnswer ? true : false}
          value={answer}
          onClick={callback}
          // className="multiple-options__button"
          className={`multiple-options__button ${
            userAnswer?.correct && answer === userAnswer.answer
              ? "true-answer"
              : null
          } ${
            userAnswer?.correct === false && answer === userAnswer.answer
              ? "false-answer"
              : null
          } ${
            userAnswer?.correct === false && answer === userAnswer.correctAnswer
              ? "true-answer"
              : null
          }`}
        >
          <span dangerouslySetInnerHTML={{ __html: answer }} />
        </button>
      ))}
    </div>
  </div>
);

export default QuestonCard;
