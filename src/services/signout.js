import { clearCookies } from "../helper/cookies";
import { removeToken } from "../store/auth/authSlice";

export const signOut = async (dispatch) => {
  dispatch(removeToken());
  clearCookies();
};
