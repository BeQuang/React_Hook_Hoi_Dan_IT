export const FETCH_USER_LOGIN_SUCCESS = "FETCH_USER_LOGIN_SUCCESS";
export const USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS";
export const USER_UPDATE_INFORMATION = "USER_UPDATE_INFORMATION";

export const doLogin = (data) => {
  return {
    type: FETCH_USER_LOGIN_SUCCESS,
    payload: data,
  };
};

export const doLogout = () => {
  return {
    type: USER_LOGOUT_SUCCESS,
  };
};

export const userUpdateInformation = (account, username, image) => {
  return {
    type: USER_UPDATE_INFORMATION,
    account: account,
    payload: {
      username,
      image,
    },
  };
};
