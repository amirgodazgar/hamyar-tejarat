import http from "../httpServices";

// SEND INFORMATION BUSINESSMAN --------------------------------- :

export const postBusinessmanPrivate = async (userInfo ) => {
  const { firstName, lastName, nationalId, phoneNumber } = userInfo;

  await http
    .post("/BusinessmanPanel/UpdatePrivateBusinessmanProfile", {
      firstName,
      lastName,
      nationalId,
      phoneNumber,
    })
    .then((res) => {
      console.log("BusinessPrivate" ,res.data);
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
      console.log("BusinessJuridical" ,res.data);
    });
};


// SEND INFORMATION CLEARANCEMAN --------------------------------- :

export const postClearancePrivate = async (userInfo ) => {
  const { firstName, lastName, nationalId, phoneNumber } = userInfo;

  await http
    .post("/ClearancePanel/UpdatePrivateClearanceProfile", {
      firstName,
      lastName,
      nationalId,
      phoneNumber,
    })
    .then((res) => {
      console.log("BusinessPrivate" ,res.data);
    });
};

export const postClearanceJuridical = async (userInfo) => {
  const { companyName, nationalCompanyId, phoneNumber } = userInfo;

  await http
    .post("/ClearancePanel/UpdateJuridicalClearanceProfile", {
      companyName,
      nationalCompanyId,
      phoneNumber,
    })
    .then((res) => {
      console.log("BusinessJuridical" ,res.data);
    });
};