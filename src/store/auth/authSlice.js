import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    formType: "",
    change: false,
  },
  reducers: {
    changeFormType: (state, action) => {
      state.formType = action.payload;
      state.change = true;
    },
  },
});

export const { changeFormType } = authSlice.actions;
export default authSlice.reducer;
