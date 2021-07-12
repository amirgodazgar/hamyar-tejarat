import { checkResendVerification, setMessage } from "../store/auth/authSlice";
import http from "./httpServices";

export const resendVerificationEmail = async (email, dispatch) => {
  await http
    .post("/Account/ResendVerificationEmail", {
      email,
    })
    .then((res) => {
     
      if (res.data.isSuccess) {
        dispatch(checkResendVerification(true));
        dispatch(setMessage(res.data.message))

      } else {
        dispatch(checkResendVerification(false));
        dispatch(setMessage(res.data.message))
      }
    });
};
