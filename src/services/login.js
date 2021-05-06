import http from "./httpServices";
import { setMessage } from "../store/auth/authSlice";

export const signIn = async (userInfo, dispatch) => {
  const { email, password } = userInfo;
  await http
    .post("Account/Login", {
      email,
      password,
    })
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        dispatch(
          setMessage(
            "برای فعال سازی حساب کاربری  وارد ایمیل خود شده و روی لینک در قسمت اسپم کلیک کنید"
          )
        );
      }
    });
};
