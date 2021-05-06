import http from "./httpServices";

export const register = async (userInfo) => {
  const { email, password, userType, userRole } = userInfo;
  await http
    .post("/Account/Register", {
      email,
      password,
      userType,
      userRole,
    })
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        // goto page verifyEmail Page and Get "queryString" email || token
      }
    });
};
