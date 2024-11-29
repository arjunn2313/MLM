import React from "react";
import { PhoneNumber } from "../Form/PhoneNumber";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function UserLogin({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  return (
    <div className="w-full md:w-1/2 flex items-center  p-8 shadow-lg shadow-blue-200 bg-white rounded-tl-[6%] rounded-bl-[6%]">
      <div className="w-full space-y-10">
        <h2 className="text-3xl font-semibold text-primary mb-8">Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
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
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link to="/signUp" className="text-primary font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
