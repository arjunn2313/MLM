import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useSearchParams } from "react-router-dom";
import { useUserLogin, useUserLoginByOtp } from "../../hooks/useAuth";

export default function PasswordForm({ path }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const { mutate, isPending } = useUserLogin();
  const { mutate: otpMutate } = useUserLoginByOtp();

  const [showPassword, setShowPassword] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const phoneNumber = searchParams.get("phoneNumber");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = ({ password }) => {
    mutate({ phoneNumber, password });
  };

  const handleOtpReq = () => {
    otpMutate(
      { phoneNumber },
      {
        onSuccess: () =>
          setSearchParams({ authStage: "forgotPassword", phoneNumber: phoneNumber }),
      }
    );
  };



  return (
    <div className="w-full md:w-1/2 flex items-center  p-8 shadow-lg shadow-blue-200 bg-white rounded-tl-[6%] rounded-bl-[6%]">
      <div className="w-full space-y-10">
        <h2 className="text-3xl font-semibold text-primary mb-8">Sign In</h2>

        <p className="max-w-[50%]">
          IN {phoneNumber}{" "}
          <Link to={path} className="underline text-primary">
            Change
          </Link>{" "}
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <span className="flex  justify-between items-center">
            <label className="block   font-medium text-gray-700 text-md mb-2">
              Enter Password 
            </label>
            <Link to="?authStage=forgotPassword" className="text-primary">Forget Password</Link>
            </span>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="mt-1 block w-full p-2 border rounded-md"
                placeholder="Enter password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password should be at least 6 characters",
                  },
                })}
              />
              <span
                className="absolute inset-y-0 right-4 flex items-center text-gray-500 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="text-center mt-10">
            <button
              type="submit"
              className="w-2/6 bg-primary text-white py-3 rounded-xl hover:bg-blue-700 transition-colors"
            >
              Verify
            </button>
          </div>
        </form>

        <div className="relative my-8 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-sm text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="text-center mt-10">
          <button
            className="w-2/6 border border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-100 transition duration-300"
            onClick={() => handleOtpReq()}
          >
            Get an OTP on your phone
          </button>
        </div>
      </div>
    </div>
  );
}
