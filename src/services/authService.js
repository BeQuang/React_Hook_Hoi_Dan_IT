import axios from "../utils/axiosCustomize";

const postLogin = (email, password) => {
  return axios.post("login", { email, password, delay: 5000 });
};

const postRegister = (email, password, username) => {
  return axios.post("register", { email, password, username });
};

const postLogout = (email, refresh_token) => {
  return axios.post("logout", { email, refresh_token });
};

const getOverview = () => {
  return axios.get("overview");
};

const postInformationProfile = (username, image) => {
  const data = new FormData();
  data.append("username", username);
  data.append("userImage", image);

  return axios.post("profile", data);
};

const postChangePasswordProfile = (current_password, new_password) => {
  return axios.post("change-password", { current_password, new_password });
};

export {
  postLogin,
  postRegister,
  postLogout,
  getOverview,
  postInformationProfile,
  postChangePasswordProfile,
};
