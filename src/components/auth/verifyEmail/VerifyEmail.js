import React from "react";
import { useHistory } from "react-router-dom";
import { verifyEmail } from "../../../services/verifyEmail";

const VerifyEmail = () => {
  const history = useHistory();
  const queryStr = history.location.search;
  const query = new URLSearchParams(queryStr);
  const email = query.get("email");
  const token = query.get("token");
  const config = {
    email,
    token,
  };
  verifyEmail(config);

  return <div>get queryString from url</div>;
};

export default VerifyEmail;
