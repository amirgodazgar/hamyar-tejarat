import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setUserInfoCookies } from "../../helper/cookies";
import http from "../../services/httpServices";
import Cookies from "js-cookie";

export const getUserInfoData = createAsyncThunk(
  "dashBoard/getUserInfoData",
  async (_, { dispatch }) => {
    const role = Cookies.get("userRole");
    if (role === "Clearanceman") {
      const data = await http
        .get("ClearancemanPanel/GetClearancemanProfile")
        .then((res) => {
          if (res.status === 200) {
            const type = res.data.data.userType;
            dispatch(setUserRole(role));
            dispatch(setUserType(type));
            setUserInfoCookies(role, type);
            Cookies.remove("userRole");
            const userInfo = Cookies.getJSON("userInfo");
            const result = res.data;
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
            const type = res.data.data.userType;
            dispatch(setUserRole(role));
            dispatch(setUserType(type));
            setUserInfoCookies(role, type);
            Cookies.remove("userRole");
            const userInfo = Cookies.getJSON("userInfo");
            const result = res.data;
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
    role: {
      Businessman: false,
      ClearanceMan: false,
    },
    type: {
      Private: false,
      Juridical: false,
    },
  },
  reducers: {
    setUserRole: (state, action) => {
      switch (action.payload) {
        case "Businessman":
          state.role.Businessman = true;
          break;
        case "Clearanceman":
          state.role.ClearanceMan = true;
          break;
        default:
          return state;
      }
    },
    setUserType: (state, action) => {
      switch (action.payload) {
        case "Private":
          state.type.Private = true;
          break;
        case "Juridical ":
          state.type.Juridical = true;
          break;
        default:
          return state;
      }
    },
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

export const { setUserRole, setUserType } = dashBoardSlice.actions;
export default dashBoardSlice.reducer;
