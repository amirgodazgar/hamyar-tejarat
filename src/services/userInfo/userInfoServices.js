import Cookies from "js-cookie";
import http from "../httpServices";

// SEND INFORMATION BUSINESSMAN --------------------------------- :

export const postBusinessmanPrivate = async (userInfo) => {
  const { firstName, lastName, nationalId, phoneNumber } = userInfo;
  console.log(userInfo)

  await http
    .post("/BusinessmanPanel/UpdatePrivateBusinessmanProfile", {
      firstName,
      lastName,
      nationalId,
      phoneNumber,
    })

    .then((res) => {
      console.log("BusinessPrivate", res);
    });
};

export const postBusinessmanJuridical = async (userInfo) => {
  const { companyName, nationalCompanyId, phoneNumber } = userInfo;

  await http
    .post("/BusinessmanPanel/UpdateJuridicalBusinessmanProfile", {
      companyName,
      nationalCompanyId,
      phoneNumber,
    })
    .then((res) => {
      console.log("BusinessJuridical", res);
    });
};

// SEND INFORMATION CLEARANCEMAN --------------------------------- :

export const postClearancePrivate = async (userInfo) => {
  const token = Cookies.get("token");

  await http
    .post("/ClearancemanPanel/UpdatePrivateClearancemanProfile", userInfo, {
      headers: {
        Authorization: `Bearer ${token}`,
        ContentType: "multipart/form-data",
      },
    })
    .then((res) => {
      console.log("ClearancePrivate-response", res);
    });
};

export const postClearanceJuridical = async (userInfo) => {
  console.log(userInfo.getAll("ChoosedCustomIds"))
  const token = Cookies.get("token");

  await http
    .post("/ClearancemanPanel/UpdateJuridicalClearancemanProfile", userInfo, {
      headers: {
        Authorization: `Bearer ${token}`,
        ContentType: "multipart/form-data",
      },
    })
    .then((res) => {
      console.log("ClearanceJuridical-response", res);
    });
};
