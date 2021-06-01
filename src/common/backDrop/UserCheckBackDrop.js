import React from "react";
import { Backdrop } from "@material-ui/core";
import { useHistory } from "react-router";
import { Alert } from "@material-ui/lab";

const UserCheckBackDrop = ({ setRoute, severity, message, reload }) => {
  const history = useHistory();

  const routeHandler = (route) => {
    history.replace(route);
    if (reload) {
      window.location.reload();
    }
  };

  return (
    <Backdrop
      open={true}
      style={{
        zIndex: "999999999999999999999999",
        background: "rgba(0,0,0,0.8)",
      }}
    >
      <div
        style={{
          padding: "5rem",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={() => routeHandler(setRoute)}
      >
        <Alert
          variant="filled"
          severity={severity}
          style={{ cursor: "pointer", borderRadius: "10px" }}
        >
          {message
            ? message
            : "( کلیک کنید ) کاربر گرامی برای استفاده از تمامی خدمات سایت همیار تجارت باید اطلاعات کاربری و مدارک خود را کامل کنید"}
        </Alert>
      </div>
    </Backdrop>
  );
};

export default UserCheckBackDrop;
