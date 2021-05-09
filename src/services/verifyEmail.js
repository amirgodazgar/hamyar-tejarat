import {
  changeFormType,
  checkVerify,
  setMessage,
} from "../store/auth/authSlice";
import http from "./httpServices";

export const verifyEmail = async (config, dispatch, isSuccess) => {
  const { email, token } = config;
  await http
    .post("/Account/VerifyEmail", {
      email,
      token,
    })
    .then((res) => {
      console.log(res);
      if (res.status === 200 ) {
        isSuccess(true);
        
        if (res.data.statusCode !== "BadRequest") {
          dispatch(changeFormType("signIn"));
          dispatch(checkVerify(true));
          dispatch(setMessage(res.data.message));
        } else {
          dispatch(checkVerify(false));
          dispatch(setMessage(res.data.message));
        }
       
      }
    });
};
