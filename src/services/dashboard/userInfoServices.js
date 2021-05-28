import Cookies from "js-cookie";
import http from "../httpServices";

// SEND INFORMATION BUSINESSMAN --------------------------------- :

export const postBusinessmanPrivate = async (userInfo) => {
  const { firstName, lastName, nationalId, phoneNumber } = userInfo;
  console.log(userInfo);

  await http
    .post("/BusinessmanPanel/UpdatePrivateBusinessmanProfile", {
      firstName,
      lastName,
      nationalId,
      phoneNumber,
    })

    .then((res) => {
      // console.log("BusinessPrivate", res);
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
      // console.log("BusinessJuridical", res);
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
      // console.log("ClearancePrivate-response", res);
    });
};

export const postClearanceJuridical = async (userInfo) => {
  console.log(userInfo.getAll("ChoosedCustomIds"));
  const token = Cookies.get("token");

  await http
    .post("/ClearancemanPanel/UpdateJuridicalClearancemanProfile", userInfo, {
      headers: {
        Authorization: `Bearer ${token}`,
        ContentType: "multipart/form-data",
      },
    })
    .then((res) => {
      // console.log("ClearanceJuridical-response", res);
    });
};

// -------------- Request Register  -------------------------------- //

// Request Register GET :

export const getRequestRegisterFormData = async () => {
  const data = await http
    .get("/BusinessmanPanel/GetQuotationRequestFormData")
    .then((res) => {
      // console.log(res)
      if (res.status === 200) {
        return res.data.data;
      }
    });
  return data;
};

// Request Register POST :
export const postRequestRegisterFormData = async (userInfo) => {
  const {
    tariffCode,
    cargoTitle,
    portOfLoading,
    originCustomIds,
    packagingType,
    cargoAmount,
    cargoTransportTools,
    cargoValue,
  } = userInfo;

  const data = await http
    .post("/BusinessmanPanel/SubmitQuotationRequestForm", {
      tariffCode,
      cargoTitle,
      portOfLoading,
      originCustomIds,
      packagingType,
      cargoAmount,
      cargoTransportTools,
      cargoValue,
    })
    .then((res) => {
      // console.log(res);
      if (res.status === 200) {
        console.log("200", res);
      }
    });
  return data;
};

// -------------- Suggestions List  -------------------------------- //

// Suggestions List  GET :

export const getSuggestionsListData = async (pageNumber = 1, pageSize = 10) => {
  const data = await http
    .get(
      `/BusinessmanPanel/GetQuotationRequestList?pageNumber=${pageNumber}&pageSize=${pageSize}`
    )
    .then((res) => {
      // console.log(res);
      if (res.status === 200) {
        return res.data.data;
      }
    });
  return data;
};

// Suggestion Single GET :

export const getSuggestionIdData = async (requestId) => {
  const data = await http
    .get(
      `/BusinessmanPanel/GetSingleQuotationRequest?quotationRequestId=${requestId}`
    )
    .then((res) => {
      // console.log(res);
      if (res.status === 200) {
        return res.data.data;
      }
    });
  return data;
};

// --------------List of Registered Suggestions  -------------------------------- //

// Proposals list GET :
export const getProposalsListData = async (
  pageNumber = 1,
  pageSize = 10,
  ProposalId
) => {
  const data = await http
    .get(
      `/BusinessmanPanel/GetQuotationProposals?quotationRequestId=${ProposalId}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    )
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        return res.data.data;
      }
    });
  return data;
};

// Proposal Single GET :
export const getProposalData = async (ProposalId) => {
  const data = await http
    .get(
      `/BusinessmanPanel/GetSingleQuotationRequest?quotationRequestId=${ProposalId}`
    )
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        return res.data.data;
      }
    });
  return data;
};

// getProposalsListData(1, 2, "8dbf4602-541f-4882-9a82-be624baf968b").then(
//   (res) => {
//     console.log(res);
//   }
// );
