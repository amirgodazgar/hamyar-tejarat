import React from "react";
import { Backdrop } from "@material-ui/core";
import { useHistory } from "react-router";
import { Alert } from "@material-ui/lab";
import { WarningOutlined } from "@material-ui/icons";

const UserCheckBackDrop = () => {
  const history = useHistory();
  return (
    <Backdrop
      open={true}
      style={{
        zIndex: "9999999999999999999",
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
        onClick={() => history.replace("/Dashboard/userInfo")}
      >
        <Alert
          variant="filled"
          severity="error"
          style={{ cursor: "pointer", borderRadius: "10px" }}
        >
          کاربر گرامی برای استفاده کامل از خدمات سایت همیار تجارت باید پروفایل و
           مدارک خود را کامل کنید
           (کلیک کنید)
        </Alert>
      </div>
    </Backdrop>
  );
};

export default UserCheckBackDrop;
