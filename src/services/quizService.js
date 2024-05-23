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

const postAssignQuiz = (quizId, userId) => {
  return axios.post("quiz-assign-to-user", { quizId, userId });
};

const getQuizWithQA = (quizId) => {
  return axios.get(`quiz-with-qa/${quizId}`);
};

const postUpSertQA = (data) => {
  return axios.post("quiz-upsert-qa", { ...data });
};

export {
  getQuizByUser,
  postCreateNewQuiz,
  getAllQuizForAdmin,
  putUpdateQuizForAdmin,
  deleteQuizForAdmin,
  postAssignQuiz,
  getQuizWithQA,
  postUpSertQA,
};
