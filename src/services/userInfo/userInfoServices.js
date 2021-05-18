import http from "../httpServices";

// SEND INFORMATION :

export const sendBusinessmanPrivate = async (userInfo, dispatch) => {
  const { firstName, lastName, nationalId, phoneNumber } = userInfo;

  await http
    .post("/BusinessmanPanel/UpdatePrivateBusinessmanProfile", {
      firstName,
      lastName,
      nationalId,
      phoneNumber,
    })
    .then((res) => {
      console.log(res.data);
    });
};

export const sendBusinessmanJuridical = async (userInfo, dispatch) => {
  const { companyName, nationalCompanyId, phoneNumber } = userInfo;

  await http
    .post("/BusinessmanPanel/UpdateJuridicalBusinessmanProfile", {
      companyName,
      nationalCompanyId,
      phoneNumber,
    })
    .then((res) => {
      console.log(res.data);
    });
};

// GET INFORMATION :

export const getBusinessmanProfile = async (dispatch) => {
  await http.get("/BusinessmanPanel/GetBusinessmanProfile").then((res) => {
    console.log(res.data.data);
    // dispatch(res.data)
  });
};
