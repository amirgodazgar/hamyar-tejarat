import axios from "axios";
import Cookies from "js-cookie";
import { setTokenCookies } from "../helper/cookies";

axios.defaults.baseURL = "https://lunacyst.ir/api/v1";

// Request Config ---------------------------------
axios.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token")
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      config.headers["Content-Type"] = "application/json";
      return config;
    } else {
      config.headers["Content-Type"] = "application/json";
      return config;
    }
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response Config -------------------------------
axios.interceptors.response.use(null, (error) => {
  const originalRequest = error.config;
  const token = Cookies.get("token");

  if (
    error.response.status === 401 &&
    originalRequest.url === "Account/RefreshToken"
  ) {
    // window.location.reload();
    return Promise.reject(error);
  }

  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const refreshToken = Cookies.get("refreshToken");

    return axios
      .post("Account/RefreshToken", {
        accessToken: token,
        refreshToken: refreshToken,
      })
      .then((res) => {
        if (res.status === 201) {
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
      });
  }
  return Promise.reject(error);
});

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
export default http;
