import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import AuthLayout from "../../components/auth/autLayout/AuthLayout";
import ForgotPassword from "../../components/auth/forgotpassword/ForgotPassword";
import ResetPassword from "../../components/auth/resetPassword/ResetPassword";
import SignIn from "../../components/auth/signIn/SignIn";
import SignUp from "../../components/auth/signUp/SignUp";
import SuccessSignUp from "../../components/auth/Confirmation/SuccessSignUp";
import ActiveAccount from "../../components/auth/Confirmation/ActiveAccount";
import SuccessChangePass from "../../components/auth/Confirmation/SuccessChangePass";
import { authData } from "../../constant/authData";
import { Route, useHistory } from "react-router-dom";
import VerifyEmail from "../../components/auth/verifyEmail/VerifyEmail";

const Auth = () => {
  const formType = useSelector((state) => state.auth.formType);
  let message = useSelector((state) => state.auth.message);
  const history = useHistory();

  let authType = null;
  let title = "";
  let titleType = "";
  let route = "";
  useEffect(() => {
    message = "";
  }, [authType]);

  switch (formType) {
    case "signIn":
      authType = <SignIn />;
      titleType = "register";
      route = "";
      break;
    case "signUp":
      authType = <SignUp />;
      titleType = "register";
      route = "";
      break;

    case "forgotPassword":
      authType = <ForgotPassword />;
      titleType = "forgotPass";
      title = authData.forgotPass.title;
      route = "";
      break;

    case "resetPassword":
      authType = <ResetPassword />;
      titleType = "resetPassword";
      title = authData.resetPass.title;
      route = "ResetPassword";
      break;

    case "verifyEmail":
      authType = <VerifyEmail />;
      titleType = "resetPassword";
      title = authData.resetPass.title;
      route = "VerifyEmail";
      break;

    case "successChangePass":
      authType = <SuccessChangePass />;
      titleType = "successChangePass";
      title = authData.successChangePass.title;
      route = "";
      break;

    case "successSignUp":
      authType = <SuccessSignUp />;
      titleType = "successSignUp";
      title = authData.successSignUp.title;
      route = "";
      break;

    case "activeAccount":
      authType = <ActiveAccount />;
      titleType = "successSignUp";
      title = authData.activeAccount.title;
      route = "";
      break;

    default:
      authType = <SignIn />;
      titleType = "register";
      route = "";
      break;
  }

  return (
    <AuthLayout titleType={titleType} title={title}>
      <Route path={`/Account/${route}`}>{authType}</Route>
    </AuthLayout>
  );
};

export default Auth;
