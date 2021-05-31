import Cookies from "js-cookie";
import http from "../httpServices";

// ----------------------------- BusinessMan Methods  -------------------------------- //

// SEND INFORMATION BUSINESSMAN --------------------------------- :
export const postBusinessmanPrivate = async (
  userInfo,
  setAlert,
  setIsConfirm,
  setOpen
) => {
  const { firstName, lastName, nationalId, phoneNumber } = userInfo;

  await http
    .post("/BusinessmanPanel/UpdatePrivateBusinessmanProfile", {
      firstName,
      lastName,
      nationalId,
      phoneNumber,
    })

    .then((res) => {
      console.log("BusinessPrivate", res);
      if (res.status === 200) {
        setAlert(res.data.message);
        setIsConfirm(true);
        setOpen(true);
      }
    })
    .catch((error) => {
      setAlert(error.response.data.message);
      setIsConfirm(false);
      setOpen(true);
    });
};

export const postBusinessmanJuridical = async (
  userInfo,
  setAlert,
  setIsConfirm,
  setOpen
) => {
  const { companyName, nationalCompanyId, phoneNumber } = userInfo;

  await http
    .post("/BusinessmanPanel/UpdateJuridicalBusinessmanProfile", {
      companyName,
      nationalCompanyId,
      phoneNumber,
    })
    .then((res) => {
      console.log("BusinessJuridical", res);
      if (res.status === 200) {
        setAlert(res.data.message);
        setIsConfirm(true);
        setOpen(true);
      }
    })
    .catch((error) => {
      setAlert(error.response.data.message);
      setIsConfirm(false);
      setOpen(true);
    });
};

// -------------- Request Register  ------------------------- //

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
      `/BusinessmanPanel/GetSingleQuotationProposal?quotationProposalId=${ProposalId}`
    )
    .then((res) => {
      // console.log(res);
      if (res.status === 200) {
        return res.data.data;
      }
    });
  return data;
};

// ----------------------------- Clearance Methods  -------------------------------- //

// SEND INFORMATION CLEARANCEMAN --------------------------------- :
export const postClearancePrivate = async (
  userInfo,
  setAlert,
  setIsConfirm,
  setOpen
) => {
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
      if (res.status === 200) {
        setAlert(res.data.message);
        setIsConfirm(true);
        setOpen(true);
      }
    })
    .catch((error) => {
      setAlert(error.response.data.message);
      setIsConfirm(false);
      setOpen(true);
    });
};

export const postClearanceJuridical = async (
  userInfo,
  setAlert,
  setIsConfirm,
  setOpen
) => {
  const token = Cookies.get("token");
  // console.log(userInfo.get("StringChoosedCustomIds"));

  await http
    .post("/ClearancemanPanel/UpdateJuridicalClearancemanProfile", userInfo, {
      headers: {
        Authorization: `Bearer ${token}`,
        ContentType: "multipart/form-data",
      },
    })
    .then((res) => {
      console.log("ClearanceJuridical-response", res);
      if (res.status === 200) {
        setAlert(res.data.message);
        setIsConfirm(true);
        setOpen(true);
      }
    })
    .catch((error) => {
      setAlert(error.response.data.message);
      setIsConfirm(false);
      setOpen(true);
    });
};

//  PROPOSALS LIST  --------------------------------- :
export const getProposalsList = async (pageNumber = 1, pageSize = 10) => {
  const data = await http
    .get(
      `/ClearancemanPanel/GetQuotationProposalsListAsync?pageNumber=${pageNumber}&pageSize=${pageSize}`
    )
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        return res.data.data;
      }
    });
  return data;
};

//  PROPOSALS DETAIL  --------------------------------- :

export const getProposalDetail = async (ProposalId) => {
  const data = await http
    .get(
      `/ClearancemanPanel/GetQuotationRequest?quotationRequestId=${ProposalId}`
    )
    .then((res) => {
      // console.log(res);
      if (res.status === 200) {
        return res.data.data;
      }
    });
  return data;
};

//  SEARCH ALL REQUEST  --------------------------------- :

export const getSearchAllRequest = async (
  page,
  pageSize,
  tariffCode,
  cargoTitle,
  portOfLoading,
  transportTools
) => {
  const data = await http
    .get(
      `/ClearancemanPanel/SearchAllQuotationRequests?pageNumber=${
        page === 0 ? 1 : page
      }&pageSize=${pageSize}&cargoTitle=${cargoTitle}&cargoTransportTools=${transportTools}&portOfLoading=${portOfLoading}&tariffCode=${tariffCode}`
    )
    .then((res) => {
      console.log(res.data.data.searchResult);
      if (res.status === 200) {
        return res.data.data.searchResult.results;
      }
    });
  return data;
};

//  SUBMIT-PROPOSAL  --------------------------------- :

export const submitQuotationProposal = async (
  quotationRequestId,
  proposalValue,
  estimatedNumberOfDays,
  businessmanType,
  setAlertMessage
) => {
  const data = {
    quotationRequestId,
    proposalValue: Number(proposalValue),
    estimatedNumberOfDays: Number(estimatedNumberOfDays),
    businessmanType,
  };
  console.log(data);
  const token = Cookies.get("token");
  await http
    .post("/ClearancemanPanel/SubmitQuotationProposal", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        setAlertMessage(res.data.message);
      } else {
        setAlertMessage(res.data.message);
      }
    });
};
