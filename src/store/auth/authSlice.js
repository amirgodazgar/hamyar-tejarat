import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    isLogin: false,
    formType: "",
    change: false,
    role: {
      privateBusinessMan: false,
      juridicalBusinessMan: false,
      privateClearanceMan: false,
      juridicalClearanceMan: true,
    },
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
  },
});

export const { changeFormType, defineRole } = authSlice.actions;
export default authSlice.reducer;
