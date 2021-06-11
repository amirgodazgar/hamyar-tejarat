import { changeLoading } from "../store/dashboard/dashboardSlice";

export const dateToPersian = (gregorianDate) =>
  new Date(gregorianDate).toLocaleDateString("fa-IR");

export const loadingHandler = (dispatch, status) => {
  dispatch(changeLoading(status));
};
