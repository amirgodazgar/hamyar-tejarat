import http from "./httpServices";

export const resetPassword = async (config , dispatch) => {
  const { email, token, newPassword, newPasswordConfirmation } = config;

  await http
    .post("/Account/ResetPassword", {
      email,
      token,
      newPassword,
      newPasswordConfirmation,
    })
    .then((res) => {
      console.log(res);
    });
};
