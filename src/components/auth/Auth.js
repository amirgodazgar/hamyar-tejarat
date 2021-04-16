import React from "react";
import { useSelector } from "react-redux";
import AuthLayout from "./autLayout/AuthLayout";
import ForgotPassword from "./forgotpassword/ForgotPassword";
import SignIn from "./signIn/SignIn";
import SignUp from "./signUp/SignUp";
import SuccessSignUp from "./Confirmation/SuccessSignUp";
import ActiveAccount from "./Confirmation/ActiveAccount";
import { authData } from "../../constant/authData";
import SuccessChangePass from "./Confirmation/SuccessChangePass";

const Auth = () => {
  const formType = useSelector((state) => state.auth.formType);

  let authType = null;
  let title = "";
  let titleType = "";

  switch (formType) {
    case "signIn":
      authType = <SignIn />;
      titleType = "register";
      break;
    case "signUp":
      authType = <SignUp />;
      titleType = "register";
      break;

    case "forgotPassword":
      authType = <ForgotPassword />;
      titleType = "forgotPass";
      title = authData.forgotPass.title;
      break;
    case "successChangePass":
      authType = <SuccessChangePass />;
      titleType = "successChangePass";
      title = authData.successChangePass.title;
      break;

    case "successSignUp":
      authType = <SuccessSignUp />;
      titleType = "successSignUp";
      title = authData.successSignUp.title;

      break;
    case "activeAccount":
      authType = <ActiveAccount />;
      titleType = "successSignUp";
      title = authData.activeAccount.title;
      break;

    default:
      authType = <SignIn />;
      titleType = "register";
      break;
  }

  return (
    <AuthLayout titleType={titleType} title={title}>
      {authType}
    </AuthLayout>
  );
};

export default Auth;
