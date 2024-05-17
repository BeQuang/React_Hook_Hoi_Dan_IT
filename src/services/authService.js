import axios from "../utils/axiosCustomize";

const postLogin = (email, password) => {
  return axios.post("login", { email, password, delay: 5000 });
};

const postRegister = (email, password, username) => {
  return axios.post("register", { email, password, username });
};

export { postLogin, postRegister };
