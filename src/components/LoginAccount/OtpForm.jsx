import React from "react";
import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";
import InputField from "../Form/InputField";

export default function OtpForm({ onSubmit,path }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [searchParams, setSearchParams] = useSearchParams();

  const phoneNumber = searchParams.get("phoneNumber");

  return (
    <div className="w-full md:w-1/2 flex items-center p-8 shadow-lg shadow-blue-200 bg-white rounded-tl-[6%] rounded-bl-[6%]">
      <div className="w-full space-y-10">
        <h2 className="text-2xl font-semibold text-primary mb-8">
          Authentication Required
        </h2>

        <p className="max-w-[50%]">
          IN {phoneNumber}{" "}
          <Link to={path} className="underline text-primary">
            Change
          </Link>{" "}
          <br /> We’ve sent a One Time Password (OTP) to the mobile number
          above. Please enter it to complete verification
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-md mb-4 font-medium text-gray-700">
              Enter OTP
            </label>
            <InputField
              name="otp"
              placeholder="Enter OTP"
              register={register("otp", {
                required: "OTP is required",
                minLength: {
                  value: 6,
                  message: "OTP should be exactly 6 digits",
                },
                maxLength: {
                  value: 6,
                  message: "OTP should be exactly 6 digits",
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "OTP must be a number",
                },
              })}
              error={errors.otp}
            />
          </div>

          <div className="text-center mt-6">
            <button
              type="submit"
              className="w-2/6 bg-primary text-white py-3 rounded-xl hover:bg-blue-700 transition-colors"
            >
              Verify
            </button>
          </div>
        </form>

        <div className="text-center">
          <Link to="/login" className="text-primary font-semibold underline">
            Resend OTP
          </Link>
        </div>
      </div>
    </div>
  );
}
