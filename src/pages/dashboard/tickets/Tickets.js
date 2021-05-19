import React from "react";
import { Alert } from "@material-ui/lab";
const Tickets = () => {
  return (
    <div
      style={{
        height: "37rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Alert
        style={{
          width: "70%",
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        variant="filled"
        color="error"
      >
        ماژول در حال پیاده سازی می باشد
      </Alert>
    </div>
  );
};

export default Tickets;
