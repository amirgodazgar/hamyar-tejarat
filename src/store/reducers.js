import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";

export const reducers = combineReducers({
  auth: authSlice,
});
