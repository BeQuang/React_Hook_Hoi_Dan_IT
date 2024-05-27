import axios from "axios";
import NProgress from "nprogress";
import { store } from "../redux/store.js";

NProgress.configure({
  showSpinner: false,
  // easing: "ease",
  // speed: 500,
  // trickleRate: 0.5,
  // easing: "ease",
  // speed: 200,
  // trickle: true,
  // trickleRate: 0.02,
  trickleSpeed: 100,
});

const instance = axios.create({
  baseURL: "http://localhost:8081/api/v1/",
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    const access_token = store?.getState()?.user?.account?.access_token;
    config.headers["Authorization"] = `Bearer ${access_token}`;
    NProgress.start();
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    NProgress.done();
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
  },
  function (error) {
    NProgress.done();
    // token expired: EC === -999
    if (error.response.data && error.response.data.EC === -999) {
      window.location.href = "./login";
    }
    // Hoặc dùng cách gọi API refresh_token
    // Tham khảo axios-retry sau đó khi xác định mã lỗi là -999 thì thực hiện gọi lại API refresh-token

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  }
);

export default instance;
