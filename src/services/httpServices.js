import axios from "axios";
import Cookies from "js-cookie";
import { clearCookies, setTokenCookies } from "../helper/cookies";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();

axios.defaults.baseURL = "https://lunacyst.ir/api/v1";

// Request Config ---------------------------------
axios.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      config.headers["Content-Type"] = "application/json";
    } else {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
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
    const token = Cookies.get("token");

    // prevent infinite loop ---------------
    if (
      error.response.status === 401 &&
      originalRequest.url === "/Account/RefreshToken"
    ) {
      clearCookies();
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
            const tokenInfo = res.data;
            const tokenData = {
              token: tokenInfo.accessToken,
              tokenExp: tokenInfo.accessTokenExpirationTime,
              refreshToken: tokenInfo.refreshToken,
              refreshTokenExp: tokenInfo.refreshTokenExpirationTime,
            };
            setTokenCookies(tokenData);
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${tokenInfo.accessToken}`;
            return axios(originalRequest);
          }
        })
        .catch((error) => {
          return Promise.reject(error);
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
