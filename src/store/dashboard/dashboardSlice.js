import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setUserInfoCookies } from "../../helper/cookies";
import http from "../../services/httpServices";
import Cookies from "js-cookie";

export const getUserInfoData = createAsyncThunk(
  "dashBoard/getUserInfoData",
  async () => {
    const userInfo = Cookies.getJSON("userInfo");
    const role = userInfo.role;
    const type = userInfo.type;

    if (role === "Clearanceman") {
      const data = await http
        .get("ClearancemanPanel/GetClearancemanProfile")
        .then((res) => {
          if (res.status === 200) {
            setUserInfoCookies(role, type);
            const result = res.data.data;
            return {
              ...result,
              userInfo,
            };
          }
        });
      return data;
    } else if (role === "Businessman") {
      const data = await http
        .get("/BusinessmanPanel/GetBusinessmanProfile")
        .then((res) => {
          if (res.status === 200) {
            setUserInfoCookies(role, type);
            const result = res.data.data;
            return {
              ...result,
              userInfo,
            };
          }
        });
      return data;
    }
  }
);

export const dashBoardSlice = createSlice({
  name: "dashBoard",
  initialState: {
    userData: null,
    status: "",
    isLoading : true
  },

  reducers: {
    changeLoading : (state , action) => {
      state.isLoading = action.payload
    }
  },

  extraReducers: {
    [getUserInfoData.pending]: (state) => {
      state.status = "pending";
    },
    [getUserInfoData.fulfilled]: (state, action) => {
      state.userData = action.payload;
      state.status = "success";
    },
    [getUserInfoData.rejected]: (state) => {
      state.status = "failed";
    },
  },
});

export const {changeLoading} = dashBoardSlice.actions;
export default dashBoardSlice.reducer;
