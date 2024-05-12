import axios from "../utils/axiosCustomize";

const postCreateUser = (email, password, username, role, avatar) => {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", avatar);

  return axios.post("participant", data);
};

const getAllUsers = () => {
  return axios.get("participant/all");
};

export { postCreateUser, getAllUsers };
