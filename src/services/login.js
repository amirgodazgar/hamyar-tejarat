import Cookies from "js-cookie";
import {
  clearCookies,
  setTokenCookies,
  setUserInfoCookies,
} from "../helper/cookies";
import { checkVerify, getToken, setMessage } from "../store/auth/authSlice";

export const signIn = async (userInfo, dispatch, history) => {
  dispatch(getToken(userInfo)).then((res) => {
    Cookies.remove("userInfo");
    Cookies.remove("userRole");
    let tokenInfo;
    let tokenData;

    if (res.payload.data.isSuccess) {
      const role = res.payload.data.data.userRole;
      const type = res.payload.data.data.userType;
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
      setUserInfoCookies(role, type);
      Cookies.set("login", res.payload.data.isSuccess);
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
