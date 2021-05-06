import React from "react";
import { useSelector } from "react-redux";
import AuthLayout from "../../components/auth/autLayout/AuthLayout";
import ForgotPassword from "../../components/auth/forgotpassword/ForgotPassword";
import SignIn from "../../components/auth/signIn/SignIn";
import SignUp from "../../components/auth/signUp/SignUp";
import SuccessSignUp from "../../components/auth/Confirmation/SuccessSignUp";
import ActiveAccount from "../../components/auth/Confirmation/ActiveAccount";
import SuccessChangePass from "../../components/auth/Confirmation/SuccessChangePass";
import { authData } from "../../constant/authData";


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
