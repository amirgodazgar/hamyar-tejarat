import http from "./httpServices";
import { changeData, changeFormType, setMessage } from "../store/auth/authSlice";

export const requestResetPassword = async (email, dispatch) => {
  await http
    .post("Account/RequestResetPassword", {
      email: email,
    })
    .then((res) => {
      if (res.status === 200) {
        dispatch(setMessage(res.data.message));
        dispatch(changeFormType("successChangePass"));
        dispatch(changeData(email));
      } else {
        return;
      }
      console.log(res);
    });
};
