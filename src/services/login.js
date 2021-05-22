import Cookies from "js-cookie";
import { clearCookies, setTokenCookies } from "../helper/cookies";
import { checkVerify, getToken, setMessage } from "../store/auth/authSlice";

export const signIn = async (userInfo, dispatch, history) => {
  dispatch(getToken(userInfo)).then((res) => {
    console.log(res);
    Cookies.remove("userInfo")
    Cookies.remove("userRole")
    let tokenInfo;
    let tokenData;
    let userRole;
    if (res.payload.data.isSuccess) {
      console.log("login", res);
      userRole = res.payload.data.data.userRole;
      tokenInfo = res.payload.data.data;
      tokenData = {
        token: tokenInfo.accessToken,
        tokenExp: tokenInfo.accessTokenExpirationTime,
        refreshToken: tokenInfo.refreshToken,
        refreshTokenExp: tokenInfo.refreshTokenExpirationTime,
      };
      dispatch(setMessage(res.payload.data.message));
      dispatch(checkVerify(true));
      setTokenCookies(tokenData);
      Cookies.set("userRole", userRole);
      setTimeout(() => {
        dispatch(setMessage(""));
        history.replace("/");
      }, 2000);
    } else {
      dispatch(setMessage(res.payload.data.message));
      dispatch(checkVerify(false));
      clearCookies();
      setTimeout(() => {
        dispatch(setMessage(""));
      }, 5000);
    }
  });
};
