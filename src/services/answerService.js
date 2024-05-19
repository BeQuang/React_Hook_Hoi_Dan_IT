import axios from "../utils/axiosCustomize";

const postSubmitAnswer = (data) => {
  return axios.post("quiz-submit", { ...data });
};

export { postSubmitAnswer };
