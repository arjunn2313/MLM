import React from "react";
import { useForm } from "react-hook-form";
import { PhoneNumber } from "../Form/PhoneNumber";
import { Link, useSearchParams } from "react-router-dom";
import { useUserForgotPassword } from "../../hooks/useAuth";
import OtpForm from "./OtpForm";

export default function PasswordAssistance({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const phoneNumber = searchParams.get("phoneNumber");
  const reset = searchParams.get("reset");

  const { mutate } = useUserForgotPassword();
 

  const handleReq = ({ phoneNumber }) => {
    mutate(
      { phoneNumber },
      {
        onSuccess: () =>
          setSearchParams({ authStage: "otp", reset: true, phoneNumber }, { replace: true }),
      }
    );
  };

  return (
    <>
      {reset ? (
        <OtpForm />
      ) : (
        <div className="w-full md:w-1/2 flex items-center  p-8 shadow-lg shadow-blue-200 bg-white rounded-tl-[6%] rounded-bl-[6%]">
          <div className="w-full space-y-10">
            <div>
              <h2 className="text-3xl font-semibold text-primary mb-3 ">
                Password assistance
              </h2>

              <p>Enter the mobile phone number associated with your account.</p>
            </div>
            <form onSubmit={handleSubmit(handleReq)}>
              <div>
                <label className="block text-md mb-4 font-medium text-gray-700  ">
                  Mobile Number<span className="text-red-500">*</span>
                </label>
                <PhoneNumber
                  defaultCountry="IN"
                  placeholder="Enter phone number"
                  value={watch("phoneNumber")}
                  onChange={(value) => setValue("phoneNumber", value)}
                  error={errors.phoneNumber}
                  register={register("phoneNumber", {
                    required: "Phone number is required",
                    validate: (value) => {
                      if (value.length < 10)
                        return "Phone number must be at least 10 digits";
                      return true;
                    },
                  })}
                />
              </div>

              <div className="text-center mt-10">
                <button
                  type="submit"
                  className="w-2/6 bg-primary text-white py-3 rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
