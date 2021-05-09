import { checkVerify, setMessage } from "../store/auth/authSlice";
import http from "./httpServices";

export const resetPassword = async (config, dispatch ) => {
  const { email, token, newPassword, newPasswordConfirmation } = config;

  await http
    .post("/Account/ResetPassword", {
      email,
      token,
      newPassword,
      newPasswordConfirmation,
    })
    .then((res) => {
      if (res.status === 200) {

        if (res.data.statusCode !== "BadRequest") {
          dispatch(checkVerify(true));
          dispatch(setMessage(res.data.message));
        } else {
          dispatch(checkVerify(false));
          dispatch(setMessage(res.data.message));
        }
      }
    });
};
