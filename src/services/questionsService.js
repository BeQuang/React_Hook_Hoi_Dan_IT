import axios from "../utils/axiosCustomize";

const getDataQuiz = (id) => {
  return axios.get(`questions-by-quiz?quizId=${id}`);
};

const postCreateNewQuestionForQuiz = (id, description, image) => {
  const data = new FormData();
  data.append("quiz_id", id);
  data.append("description", description);
  data.append("questionImage", image);

  return axios.post("question", data);
};

export { getDataQuiz, postCreateNewQuestionForQuiz };
