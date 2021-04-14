import React from "react";
import AuthLayout from "./autLayout/AuthLayout";
import SignIn from "./signIn/SignIn";

const Auth = () => {
  // const authType = null;

  // switch (authType) {
  //   case "signIn":
  //     authType = <SignIn />;
  //     break;
  //   case "signUp":
  //     authType;
  //     break;
  //   case "forgotPassword":
  //     authType;
  //     break;
  //   case "successSignUp":
  //     authType;
  //     break;
  //   case "activeAccount":
  //     authType;
  //     break;

  //   default:
  //     authType = <SignIn />;
  //     break;
  // }

  return (
    <AuthLayout title="register">
      <SignIn />
    </AuthLayout>
  );
};

export default Auth;
