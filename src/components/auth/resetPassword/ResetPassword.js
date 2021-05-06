import React from "react";
import { useHistory } from "react-router-dom";

const ResetPassword = () => {
  const history = useHistory();
  const queryStr = history.location.search;
  const query = new URLSearchParams(queryStr);
  const email = query.get("email");
  const token = query.get("token");
  const config = {
    email,
    token,
  };


  console.log(config);

  return <div>reset</div>;
};

export default ResetPassword;
