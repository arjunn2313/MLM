import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import InputField from "../Form/InputField";
import { PhoneNumber } from "../Form/PhoneNumber";
export default function CreateAccount({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="w-full md:w-1/2 flex items-center justify-center p-8 shadow-lg shadow-blue-200 bg-white rounded-tl-[6%] rounded-bl-[6%]">
      <div className="w-full">
        <h2 className="text-2xl font-semibold text-primary mb-8">
          Create Account
        </h2>

        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block  font-medium text-gray-700 text-md mb-2">
              Full Name<span className="text-red-500">*</span>
            </label>
            <InputField
              name="fullName"
              placeholder="Enter name"
              register={register("fullName", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name should be at least 3 characters",
                },
              })}
              error={errors.fullName}
            />
          </div>

          <div>
            <label className="block text-md mb-2 font-medium text-gray-700  ">
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

          <div>
            <label className="block text-md mb-2 font-medium text-gray-700 ">
              Email<span className="text-red-500">*</span>
            </label>
            <InputField
              name="email"
              placeholder="Enter email"
              register={register("email", {
                required: "Email is required",
              })}
              error={errors.email}
            />
          </div>

          <div>
            <label className="block   font-medium text-gray-700 text-md mb-2">
              Enter Password<span className="text-red-500">*</span>
            </label>
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

          <div>
            <label className="block text-md mb-2 font-medium text-gray-700 ">
              Re-Enter Password<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="mt-1 block w-full p-2 border rounded-md"
                placeholder="Re-enter password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
              />
              <span
                className="absolute inset-y-0 right-4 flex items-center text-gray-500 cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-2/6 bg-primary text-white py-3 rounded-xl hover:bg-blue-700 transition-colors"
            >
              Verify Mobile Number
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Already have an account? {" "}
              <Link to="/signIn" className="text-primary font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
