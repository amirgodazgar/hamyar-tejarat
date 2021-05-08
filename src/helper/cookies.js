import Cookies from "js-cookie";

export const setTokenCookies = (tokenData) => {
  const { token, tokenExp, refreshToken, refreshTokenExp } = tokenData;

  Cookies.set("token", token);
  Cookies.set("tokenExp", tokenExp);
  Cookies.set("refreshToken", refreshToken);
  Cookies.set("refreshTokenExp", refreshTokenExp);
};
