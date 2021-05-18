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
    // console.log("req config", { ...config });
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
      error.response.status === 401 
      // && originalRequest.url === "Account/RefreshToken"
    ) {

      clearCookies();
      history.replace("/Register");
      window.location.reload();
      return Promise.reject(error);
    }

    // handle refresh token ----------------------
    // if (error.response.status === 401 && !originalRequest._retry) {
    //   originalRequest._retry = true;

    //   console.log("second condition" ,error.response.status)

      // const refreshToken = Cookies.get("refreshToken");

      // return axios
      // .post("/Account/RefreshToken", {
      //   accessToken: token,
      //   refreshToken: refreshToken,
      // })
    //   .then((res) => {

    //       console.log("in axios " ,res)

    //       if (res.status === 200) {
    //         const tokenInfo = res.data;
    //         const tokenData = {
    //           token: tokenInfo.accessToken,
    //           tokenExp: tokenInfo.accessTokenExpirationTime,
    //           refreshToken: tokenInfo.refreshToken,
    //           refreshTokenExp: tokenInfo.refreshTokenExpirationTime,
    //         };
    //         setTokenCookies(tokenData);
    //         axios.defaults.headers.common[
    //           "Authorization"
    //         ] = `Bearer ${tokenInfo.accessToken}`;
    //         return axios(originalRequest);
    //       }
    //     })
    //     .catch((error) => {
    //       // clearCookies();
    //       return Promise.reject(error);
    //     });
    // }

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

// // ? set with Credential to ture
// // axios.defaults.withCredentials = true;
// // ? check the header request
// axios.interceptors.request.use((config) => {
//   const token = Cookies.get("token");
//   console.log(token);
//   config.headers["Authorization"] = `Bearer ${token}`;

//   // if (
//   //   (config.url === "Account/Login") |
//   //   (config.url === "Account/RefreshToken")
//   //   ) {
//   //   config.headers = {};
//   // }
//   return config;
// });
// // ? check 401 reponse to refresh the token
// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (err) => {
//     return new Promise((resolve, reject) => {
//       const originalReqest = err.config;

//       if (
//         err.response.status === 401 &&
//         originalReqest.url === "Account/RefreshToken"
//       ) {
//         // clearCookies();
//         // history.replace("/Register");
//         // window.location.reload();
//         return Promise.reject(err);
//       }

//       if (
//         err.response.status === 401 &&
//         err.config &&
//         !err.config.__isRetryRequest
//       ) {
//         originalReqest._retry = true;

//         const body = {
//           accessToken: Cookies.get("token"),
//           refreshToken: Cookies.get("refreshToken"),
//         };

//         let res = axios.post("Account/RefreshToken", body).then((res) => {

//           console.log(res);

//           // localStorage.setItem("access", res.access);
//           Cookies.set("token", res.data.accessToken);
//           originalReqest.headers[
//             "Authorization"
//           ] = `Bearer ${res.data.accessToken}`;
//           axios.defaults.headers.common[
//             "Authorization"
//           ] = `Bearer ${res.data.accessToken}`;
//           return axios(originalReqest);
//         });

//         resolve(res);
//       }

//       return Promise.reject(err);
//     });
//   }
// );
// // };
// // export default initialzeAxios;
// const http = {
//   get: axios.get,
//   post: axios.post,
//   put: axios.put,
//   delete: axios.delete,
// };
// export default http;
