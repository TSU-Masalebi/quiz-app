import { shuffleArray } from "./utils";
import { TEST_FILE } from "./pages/Home";

export type Question = {
  number: number;
  category: string;
  correct_answer: string;
  incorrect_answers: string[];
  question: string;
};

export type QuestionState = Question & { answers: string[] };

export type SubjectType = {
  subject_name: string;
  sub_name: string;
  file_name: string;
};

export const fetchSubjects = async () => {
  try {
    const endpoint = "./data/Main.data.json";
    const data = await (await fetch(endpoint)).json();
    // console.log(data);
    return data.subjects.map((subj: SubjectType) => ({
      ...subj,
    }));
  } catch (err) {
    console.error(err, "Cannot fetch the API");
  }
};
/*
export const fetchQuizQuestions = async (amount: number) => {
  try {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&type=multiple`;
    const data = await (await fetch(endpoint)).json();
    console.log(data);
    return data.results.map((question: Question) => ({
      ...question,
      answers: shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
    }));
  } catch (err) {
    console.error(err, "Cannot fetch the API");
  }
};
*/

export const fetchQuizQuestions = async () => {
  try {
    const endpoint = `../data/${TEST_FILE}`;
    const data = await (await fetch(endpoint)).json();
    // console.log(data);
    const newData = data.results.map((question: Question) => ({
      ...question,
      answers: shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
    }));
    // console.log(shuffleArray(newData));
    return shuffleArray(newData);
  } catch (err) {
    console.error(err, "Cannot fetch the API");
  }
};
