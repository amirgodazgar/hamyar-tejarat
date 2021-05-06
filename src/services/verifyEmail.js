import http from "./httpServices";

export const verifyEmail = async (config) => {
  const { email, token } = config;
  await http
    .post("/Account/VerifyEmail", {
      email,
      token,
    })
    .then((res) => {
      console.log(res);
    });
};
