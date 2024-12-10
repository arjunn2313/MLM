import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../../components/Form/InputField";
import { useForm } from "react-hook-form";
import SaveButton from "../../../components/Button/saveButton";
import { FaEnvelope, FaLock, FaUserShield } from "react-icons/fa"; // Icons for email and password fields
import { BsFillPersonFill } from "react-icons/bs"; // Icon for admin
import { useAdminLogin } from "../../../hooks/useAuth";
 

const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isPending,error} = useAdminLogin();

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-2xl">
        {/* Logo & Heading */}
        <div className="text-center mb-8">
          <FaUserShield className="mx-auto text-7xl text-blue-500 mb-4  " />
          <h2 className="text-4xl font-bold text-gray-800">Admin Login</h2>
          <p className="text-sm text-gray-500 mt-2">
            Access your admin dashboard securely
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <InputField
              label="Email"
              name="email"
              placeholder="Enter your email"
              register={register("email", {
                required: "Email is required",
                minLength: {
                  value: 3,
                  message: "Email should be at least 3 characters",
                },
              })}
              error={errors.email}
            />
          </div>

          <div>
            <InputField
              label="Password"
              name="password"
              placeholder="Enter your password"
              register={register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password should be at least 6 characters",
                },
              })}
              error={errors.password}
              type="password"
            />
          </div>

          <div className="text-center">
            <button
              disabled={isPending}
              type="submit"
              className="w-full py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none transition-transform duration-300 transform hover:scale-105"
            >
              {isPending ?  "Login..." : " Login"}
            </button>
          </div>
          {error &&
          <p className="text-center text-red-500 font-semibold">{error?.response?.data?.message}</p>
          }
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/signUp"
              className="text-blue-400 hover:underline transition-colors duration-200"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
