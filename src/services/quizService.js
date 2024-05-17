import axios from "../utils/axiosCustomize";

const getQuizByUser = () => {
  return axios.get("quiz-by-participant");
};

export { getQuizByUser };
