import React from "react";
import { Backdrop, CircularProgress, Fab } from "@material-ui/core";
import logoImg from "../../styles/image/logo.png";

const BackDrop = () => {
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
        }}
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
