import axios from "axios";
import Cookies from "js-cookie";
import {
  clearCookies,
  setTokenCookies,
  setUserInfoCookies,
} from "../helper/cookies";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();

axios.defaults.baseURL = "https://lunacyst.ir/api/v1";

// Request Config ---------------------------------
axios.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      config.headers["Access-Control-Allow-Origin"] = "*";
      return config;
    } else {
      return config;
    }
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response Config -------------------------------
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;

    // prevent infinite loop ---------------
    if (
      error.response.status === 401 &&
      originalRequest.url === "/Account/RefreshToken"
    ) {
      clearCookies();
      Cookies.set("login", false);
      history.replace("/Register");
      window.location.reload();
      return Promise.reject(error);
    }

    // handle refresh token ----------------------
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      return axios
        .post("/Account/RefreshToken", {
          accessToken: Cookies.get("token"),
          refreshToken: Cookies.get("refreshToken"),
        })
        .then((res) => {
          if (res.status === 200) {
            const tokenInfo = res.data.data;
            const role = res.data.data.userRole;
            const type = res.data.data.userType;
            const tokenData = {
              token: tokenInfo.accessToken,
              tokenExp: tokenInfo.accessTokenExpirationTime,
              refreshToken: tokenInfo.refreshToken,
              refreshTokenExp: tokenInfo.refreshTokenExpirationTime,
            };
            setTokenCookies(tokenData);
            setUserInfoCookies(role, type);
            Cookies.set("login", true);
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${tokenInfo.accessToken}`;
          } else {
            clearCookies();
            history.replace("/Register");
            window.location.reload();
          }
          return axios(originalRequest);
        });
    }

    // for usual Errors
    return Promise.reject(error);
  }
);

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
export default http;
