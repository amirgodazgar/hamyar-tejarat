import { checkVerify, setMessage } from "../store/auth/authSlice";
import http from "./httpServices";

export const register = async (userInfo, dispatch, history) => {
  const { email, password, userType, userRole } = userInfo;
  await http
    .post("/Account/Register", {
      email,
      password,
      userType,
      userRole,
    })
    .then((res) => {
      console.log(res);
      if (res.data.isSuccess) {
        dispatch(setMessage(res.data.message));
        dispatch(checkVerify(true));
        setTimeout(() => {
          dispatch(setMessage(""));
          history.replace("/Register");
        }, 5000);
      } else {
        dispatch(setMessage(res.data.message));
        dispatch(checkVerify(false));
        // Show send another EMAIL
        console.log("reject")
        
      }
    });
};
