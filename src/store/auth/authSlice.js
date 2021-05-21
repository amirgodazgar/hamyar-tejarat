import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { clearCookies } from "../../helper/cookies";
import http from "../../services/httpServices";

export const getToken = createAsyncThunk("auth/getToken", async (userInfo) => {
  const { email, password } = userInfo;
  clearCookies();
  const data = await http
    .post("Account/Login", {
      email,
      password,
    })
    .then((res) => res);
  return data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: {
      token: "",
      tokenExp: "",
      refreshToken: "",
      refreshTokenExp: "",
    },
    isLogin: false,
    status: "",
    message: "",
    formType: "",
    isVerify: false,
    isResendVerification: false,
    change: false,
    role: {
      privateBusinessMan: false,
      juridicalBusinessMan: false,
      privateClearanceMan: true,
      juridicalClearanceMan: false,
    },
    anyData: "",
  },
  reducers: {
    changeFormType: (state, action) => {
      state.formType = action.payload;
      state.change = true;
    },
    defineRole: (state, action) => {
      switch (action.payload) {
        case "PB":
          state.role.privateBusinessMan = true;
          break;
        case "JB":
          state.role.juridicalBusinessMan = true;
          break;
        case "PC":
          state.role.privateClearanceMan = true;
          break;
        case "JC":
          state.role.juridicalClearanceMan = true;
          break;

        default:
          return state;
      }
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    changeData: (state, action) => {
      state.anyData = action.payload;
    },
    checkVerify: (state, action) => {
      state.isVerify = action.payload;
    },
    checkResendVerification: (state, action) => {
      state.isResendVerification = action.payload;
    },
    removeToken: (state) => {
      state.token = "";
    },
  },
  extraReducers: {
    [getToken.pending]: (state) => {
      state.status = "pending";
      state.isLogin = false;
    },
    [getToken.fulfilled]: (state, action) => {
      state.token = action.payload;
      state.status = "success";
      state.isLogin = true;
    },
    [getToken.rejected]: (state) => {
      state.status = "failed";
      state.isLogin = false;
    },
  },
});

export const {
  changeFormType,
  defineRole,
  setMessage,
  changeData,
  checkVerify,
  checkResendVerification,
  removeToken,
} = authSlice.actions;
export default authSlice.reducer;
