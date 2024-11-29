import React from "react";
import SignUpImg from "../../assets/Singup.svg";
import CreateAccount from "../../components/LoginAccount/CreateAccount";
import OtpForm from "../../components/LoginAccount/OtpForm";
import { useNavigate, useSearchParams } from "react-router-dom";
import { data } from "autoprefixer";
import { useUserAccount, useUserOtValidate } from "../../hooks/useAuth";

const SignUp = () => {
  const { mutate, isPending } = useUserAccount();
  const { mutate: otpMutate, isPending: otpPending } = useUserOtValidate();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const showOtp = searchParams.get("showOtp");
  const phoneNumber = searchParams.get("phoneNumber");

  const handleSignUpSubmit = (data) => {
    const { phoneNumber } = data;

    mutate(data, {
      onSuccess: () => {
        setSearchParams(
          { showOtp: "true", phoneNumber: phoneNumber },
          { replace: true }
        );
      },
    });
  };

  const handleOTPSubmit = (otp) => {
    const data = {
      otp: otp.otp,
      phoneNumber: phoneNumber,
    };
    
    
    otpMutate(data);
  };

  return (
    <div className="max-h-screen flex flex-col md:flex-row overflow-hidden font-poppins">
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <img
          src={SignUpImg}
          alt="Network Illustration"
          className="object-contain w-3/4 h-[90%]"
        />
      </div>

      {showOtp === "true" ? (
        <OtpForm onSubmit={handleOTPSubmit} path="/signUp"/>
      ) : (
        <CreateAccount onSubmit={handleSignUpSubmit} isPending={isPending} />
      )}
    </div>
  );
};

export default SignUp;
