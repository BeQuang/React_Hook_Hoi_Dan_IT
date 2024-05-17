import axios from "../utils/axiosCustomize";

const getDataQuiz = (id) => {
  return axios.get(`questions-by-quiz?quizId=${id}`);
};

export { getDataQuiz };
