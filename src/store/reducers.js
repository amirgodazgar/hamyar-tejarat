import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import { dashBoardSlice } from "./dashboard/dashboardSlice";

export const reducers = combineReducers({
  auth: authSlice,
  dashBoard: dashBoardSlice,
});
