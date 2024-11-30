import React from "react";
import SignUpImg from "../../../assets/Singup.svg";
import UserLogin from "../../../components/LoginAccount/UserLogin";
import { useUserLogin, useUserLoginByOtpValidate } from "../../../hooks/useAuth";
import { useSearchParams } from "react-router-dom";
import OtpForm from "../../../components/LoginAccount/OtpForm";
import PasswordForm from "../../../components/LoginAccount/PasswordForm";
import PasswordAssistance from "../../../components/LoginAccount/PasswordAssistance";

export default function SignIn() {
  const { mutate, isPending } = useUserLogin();
  const { mutate: loginMutate } = useUserLoginByOtpValidate();
  const [searchParams, setSearchParams] = useSearchParams();
  const authStage = searchParams.get("authStage");
  const phoneNumber = searchParams.get("phoneNumber");

  const handleSubmit = (data) => {
    setSearchParams(
      { authStage: "password", phoneNumber: data.phoneNumber },
      { replace: true }
    );
  };

  const veryOtp = ({ otp }) => {
    loginMutate({ phoneNumber, otp });
  };

  let componentToRender;

  switch (authStage) {
    case "otp":
      componentToRender = <OtpForm path="/signIn" onSubmit={veryOtp} />;
      break;
    case "forgotPassword":
      componentToRender = <PasswordAssistance />;
      break;
    case "password":
      componentToRender = <PasswordForm path="/signIn" />;
      break;
    default:
      componentToRender = <UserLogin onSubmit={handleSubmit} />;
      break;
  }

  return (
    <div className="max-h-screen flex flex-col md:flex-row overflow-hidden font-poppins">
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <img
          src={SignUpImg}
          alt="Network Illustration"
          className="object-contain w-3/4 h-[90%]"
        />
      </div>

      {componentToRender}
    </div>
  );
}
