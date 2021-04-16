import React from "react";
import { useSelector } from "react-redux";
import AuthLayout from "./autLayout/AuthLayout";
import ForgotPassword from "./forgotpassword/ForgotPassword";
import SignIn from "./signIn/SignIn";
import SignUp from "./signUp/SignUp";

const Auth = () => {
  const formType = useSelector((state) => state.auth.formType);
  console.log(formType);
  let authType = null;

  switch (formType) {
    case "signIn":
      authType = <SignIn />;
      break;
    case "signUp":
      authType = <SignUp />;
      break;
    case "forgotPassword":
      authType = <ForgotPassword />;
      break;
    // case "successChangePassword":
    //   authType;
    //   break;
    // case "successSignUp:
    //   authType;
    //   break;
    // case "activeAccount":
    //   authType;
    //   break;

    default:
      authType = <SignIn />;
      break;
  }

  return <AuthLayout title="register">{authType}</AuthLayout>;
};

export default Auth;
