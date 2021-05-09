import { setTokenCookies } from "../helper/cookies";
import { checkVerify, getToken, setMessage } from "../store/auth/authSlice";

export const signIn = async (userInfo, dispatch, history) => {
  dispatch(getToken(userInfo)).then((res) => {
    console.log(res.payload.data);
    let tokenInfo;
    let tokenData;

    if (res.payload.data.isSuccess) {
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
      setTimeout(() => {
        dispatch(setMessage(""));
        history.replace("/");
      }, 2000);
    } else {
      tokenData = {
        token: "",
        tokenExp: "",
        refreshToken: "",
        refreshTokenExp: "",
      };
      dispatch(setMessage(res.payload.data.message));
      dispatch(checkVerify(false));
      setTokenCookies(tokenData);
      setTimeout(() => {
        dispatch(setMessage(""));
      }, 5000);
    }
  });
};
