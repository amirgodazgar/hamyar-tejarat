import React from "react";
import { Backdrop, CircularProgress, Fab } from "@material-ui/core";
import logoImg from "../../styles/image/logo.png";
import { useHistory } from "react-router";

const BackDrop = () => {
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
        onClick={() => history.replace("/")}
      >
        <Fab
          style={{
            padding: ".5rem",
            background: "#fff",
            position: "absolute",
          }}
        >
          <img
            style={{ width: "100%", height: "100%" }}
            src={logoImg}
            alt="hamyar-tejarat"
            onClick={() => history.replace("/")}
          />
        </Fab>
        <CircularProgress
          size={80}
          style={{
            position: "absolute",
            fill: "#ffffff !important",
            color: "#ffffff",
          }}
        />
      </div>
    </Backdrop>
  );
};

export default BackDrop;
