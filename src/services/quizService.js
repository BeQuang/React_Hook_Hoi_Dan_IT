import axios from "../utils/axiosCustomize";

const getQuizByUser = () => {
  return axios.get("quiz-by-participant");
};

const postCreateNewQuiz = (name, description, type, image) => {
  const data = new FormData();
  data.append("name", name);
  data.append("description", description);
  data.append("difficulty", type);
  data.append("quizImage", image);

  return axios.post("quiz", data);
};

const getAllQuizForAdmin = () => {
  return axios.get("quiz/all");
};

const putUpdateQuizForAdmin = (id, name, description, type, image) => {
  const data = new FormData();
  data.append("id", id);
  data.append("name", name);
  data.append("description", description);
  data.append("difficulty", type);
  data.append("quizImage", image);

  return axios.put("quiz", data);
};

const deleteQuizForAdmin = (id) => {
  return axios.delete(`quiz/${id}`);
};

export {
  getQuizByUser,
  postCreateNewQuiz,
  getAllQuizForAdmin,
  putUpdateQuizForAdmin,
  deleteQuizForAdmin,
};
