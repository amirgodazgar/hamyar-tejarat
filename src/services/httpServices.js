import axios from "axios";

axios.defaults.baseURL = "https://lunacyst.ir/api/v1";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (expectedError) {
    console.log(error);
  }

  if (!expectedError) {
    //
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
