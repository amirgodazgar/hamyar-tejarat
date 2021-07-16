import Cookies from "js-cookie";
import http from "../httpServices";

// ----------------------------- BusinessMan Methods  --------------------------------------------------- //

// DASHBOARD INFO--------------------------------------:

export const getBusinessmanDashboardData = async () => {
  const data = await http
    .get("/BusinessmanPanel/GetBusinessmanDashboardData")
    .then((res) => {
      if (res.status === 200) {
        return res.data.data.recentQuotationRequests;
      }
    });
  return data;
};

// SEND INFORMATION BUSINESSMAN --------------------------------- :
export const postBusinessmanPrivate = async (
  userInfo,
  setAlert,
  setIsConfirm,
  setOpen,
  setIsLoading
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
      if (res.status === 200) {
        setIsLoading(false);
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
  setOpen,
  setIsLoading
) => {
  const { companyName, nationalCompanyId, phoneNumber } = userInfo;

  await http
    .post("/BusinessmanPanel/UpdateJuridicalBusinessmanProfile", {
      companyName,
      nationalCompanyId,
      phoneNumber,
    })
    .then((res) => {
      if (res.status === 200) {
        setIsLoading(false);
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
      if (res.status === 200) {
        return res.data.data;
      }
    });
  return data;
};
// Request Register ClearanceFormData GET :
export const getRequestRegisterClearanceFormData = async () => {
  const data = await http
    .get("/BusinessmanPanel/GetClearanceRequestForm")
    .then((res) => {
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

  const data = await http.post("/BusinessmanPanel/SubmitQuotationRequestForm", {
    tariffCode,
    cargoTitle,
    portOfLoading,
    originCustomIds,
    packagingType,
    cargoAmount,
    cargoTransportTools,
    cargoValue,
  });

  return data;
};

// Request Register purchase POST :
export const postRequestRegisterFormDataPurchase = async (formData) => {
  const token = Cookies.get("token");

  await http.post("/BusinessmanPanel/SubmitClearanceRequest", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "multipart/form-data",
    },
  });
};

// -------------- Suggestions List  -------------------------------- //

// Suggestions List  GET :
export const getSuggestionsListData = async (pageNumber = 1, pageSize = 10) => {
  const data = await http
    .get(
      `/BusinessmanPanel/GetQuotationRequestList?pageNumber=${pageNumber}&pageSize=${pageSize}`
    )
    .then((res) => {
      if (res.status === 200) {
        return res.data;
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
      if (res.status === 200) {
        return res.data.data;
      }
    });
  return data;
};

// CLEARANCE Proposals list GET :
export const getClearanceProposalList = async (
  pageNumber = 1,
  pageSize = 10,
  ProposalId
) => {
  const data = await http
    .get(
      `/BusinessmanPanel/GetClearanceProposals?clearanceRequestId=${ProposalId}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    )
    .then((res) => {
      if (res.status === 200) {
        return res.data.data;
      }
    });
  return data;
};

// CLEARANCE Proposals single GET :
export const getClearanceProposalSingle = async (ProposalId) => {
  const data = await http
    .get(
      `/BusinessmanPanel/GetSingleClearanceProposal?clearanceProposalId=${ProposalId}`
    )
    .then((res) => {
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
      if (res.status === 200) {
        return res.data.data;
      }
    });
  return data;
};

// GetClearanceRequestsList :
export const getClearanceRequestsList = async (
  pageNumber = 1,
  pageSize = 10
) => {
  const data = await http
    .get(
      `/BusinessmanPanel/GetClearanceRequestsList?pageNumber=${pageNumber}&pageSize=${pageSize}`
    )
    .then((res) => {
      if (res.status === 200) {
        return res.data.data.results;
      }
    });
  return data;
};

// GetSingleClearanceRequest :
export const getSingleClearanceRequest = async (clearanceRequestId) => {
  const data = await http
    .get(
      `/BusinessmanPanel/GetSingleClearanceRequest?clearanceRequestId=${clearanceRequestId}`
    )
    .then((res) => {
      if (res.status === 200) {
        return res.data.data;
      }
    });
  return data;
};

// ----------------------------- Clearance Methods  -----------------------------------------------------------------//

// DASHBOARD INFO--------------------------------------:

export const getClearancemanDashboardData = async () => {
  const data = await http
    .get("/ClearancemanPanel/GetClearancemanDashboardData")
    .then((res) => {
      if (res.status === 200) {
        return res.data.data.recentQuotationRequests;
      }
    });
  return data;
};

// SEND INFORMATION CLEARANCEMAN --------------------------------- :
export const postClearancePrivate = async (
  userInfo,
  setAlert,
  setIsConfirm,
  setOpen,
  setIsLoading
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
      if (res.status === 200) {
        setIsLoading(false);
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
  setOpen,
  setIsLoading
) => {
  const token = Cookies.get("token");

  await http
    .post("/ClearancemanPanel/UpdateJuridicalClearancemanProfile", userInfo, {
      headers: {
        Authorization: `Bearer ${token}`,
        ContentType: "multipart/form-data",
      },
    })
    .then((res) => {
      if (res.status === 200) {
        setIsLoading(false);
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
      if (res.status === 200) {
        return res.data.data;
      }
    });
  return data;
};
//  CLEARANCE LIST  --------------------------------- :
export const getClearanceList = async (pageNumber = 1, pageSize = 10) => {
  const data = await http
    .get(
      `/ClearancemanPanel/GetClearanceProposalsListAsync?pageNumber=${pageNumber}&pageSize=${pageSize}`
    )
    .then((res) => {
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
      if (res.status === 200) {
        return res.data.data;
      }
    });
  return data;
};

//  SEARCH ALL REQUEST QUOTATION --------------------------------- :

export const getSearchAllRequest = async (
  page,
  pageSize,
  tariffCode,
  cargoTitle,
  portOfLoading,
  transportTools
) => {
  const url =
    transportTools === ""
      ? `/ClearancemanPanel/SearchAllQuotationRequests?pageNumber=${
          page === 0 ? 1 : page
        }&pageSize=${pageSize}&cargoTitle=${cargoTitle}&portOfLoading=${portOfLoading}&tariffCode=${tariffCode}`
      : `/ClearancemanPanel/SearchAllQuotationRequests?pageNumber=${
          page === 0 ? 1 : page
        }&pageSize=${pageSize}&cargoTitle=${cargoTitle}&cargoTransportTools=${transportTools}&portOfLoading=${portOfLoading}&tariffCode=${tariffCode}`;

  const data = await http.get(url).then((res) => {
    if (res.status === 200) {
      return res.data.data.searchResult.results;
    }
  });
  return data;
};

//  SEARCH ALL REQUEST CLEARANCE --------------------------------- :

export const searchAllClearanceRequests = async (
  page,
  pageSize,
  tariffCode,
  cargoTitle,
  portOfLoading,
  transportTools
) => {
  const url =
    transportTools === ""
      ? `/ClearancemanPanel/SearchAllClearanceRequests?pageNumber=${
          page === 0 ? 1 : page
        }&pageSize=${pageSize}&cargoTitle=${cargoTitle}&portOfLoading=${portOfLoading}&tariffCode=${tariffCode}`
      : `/ClearancemanPanel/SearchAllClearanceRequests?pageNumber=${
          page === 0 ? 1 : page
        }&pageSize=${pageSize}&cargoTitle=${cargoTitle}&cargoTransportTools=${transportTools}&portOfLoading=${portOfLoading}&tariffCode=${tariffCode}`;

  const data = await http.get(url).then((res) => {
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

//  SUBMIT-REQUEST-CLEARANCE  --------------------------------- :

export const getClearanceRequestDetail = async (clearanceRequestId) => {
  const data = await http
    .get(
      `/ClearancemanPanel/GetClearanceRequest?clearanceRequestId=${clearanceRequestId}`
    )
    .then((res) => {
      if (res.status === 200) {
        return res.data.data;
      }
    });
  return data;
};

//  SUBMIT-PROPOSAL  --------------------------------- :

export const submitClearanceProposal = async (
  clearanceRequestId,
  proposalValue,
  estimatedNumberOfDays,
  setAlertMessage
) => {
  const data = {
    clearanceRequestId,
    proposalValue: Number(proposalValue),
    estimatedNumberOfDays: Number(estimatedNumberOfDays),
  };

  const token = Cookies.get("token");
  await http
    .post("/ClearancemanPanel/SubmitClearanceProposal", data, {
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

// SEARCH CARGO AUTOCOMPLETE :
export const searchCargoByTerm = async (key) => {
  const data = await http
    .get(`/CustomsCargos/SearchCustomsCargosByTerm?term=${key}`)
    .then((res) => {
      // console.log(res);
      return res.data.data;
    });
  return data;
};

// searchCargoByTerm("اسب");
