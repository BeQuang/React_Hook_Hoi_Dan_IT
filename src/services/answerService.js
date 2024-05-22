import axios from "../utils/axiosCustomize";

const postSubmitAnswer = (data) => {
  return axios.post("quiz-submit", { ...data });
};

const postCreateNewAnswerForQuestion = (
  description,
  correct_answer,
  question_id
) => {
  return axios.post("answer", {
    description,
    correct_answer,
    question_id,
  });
};

export { postSubmitAnswer, postCreateNewAnswerForQuestion };
