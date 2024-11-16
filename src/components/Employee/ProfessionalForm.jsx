import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../Form/InputField";
import Heading from "../Headings/Headings";
import SaveButton from "../Button/saveButton";
import { useCreateEmployee } from "../../hooks/useEmployee";

export default function ProfessionalForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  
  const { mutate, isLoading, isError, error, isSuccess } = useCreateEmployee();

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-white p-6  mx-auto space-y-6">
        <Heading text="Employee Details" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white">
          <InputField
            label="Name"
            name="name"
            register={register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name should be at least 3 characters",
              },
            })}
            error={errors.name}
          />
          <InputField
            label="Employee Code"
            name="employeeCode"
            register={register("employeeCode", {
              required: "Employee code is required",
              pattern: {
                value: /^[A-Za-z0-9]+$/,
                message: "Employee code must be alphanumeric",
              },
            })}
            error={errors.employeeCode}
          />
          <InputField
            label="Designation"
            name="designation"
            register={register("designation", {
              required: "Designation is required",
            })}
            error={errors.designation}
          />
          <InputField
            label="Gender"
            name="gender"
            register={register("gender", {
              required: "Gender is required",
            })}
            error={errors.gender}
          />
          <InputField
            label="Concern Joining Date"
            name="joiningDate"
            type="date"
            register={register("joiningDate", {
              required: "Joining date is required",
            })}
            error={errors.joiningDate}
          />
          <InputField
            label="Last Working Date"
            name="lastWorkingDate"
            type="date"
            register={register("lastWorkingDate", {
              validate: (value) =>
                value === "" || new Date(value) > new Date() || "Invalid date",
            })}
            error={errors.lastWorkingDate}
          />
          <InputField
            label="Reporting Manager"
            name="reportingManager"
            type="select"
            options={["Sherin"]}
            register={register("reportingManager", {
              required: "Reporting Manager is required",
            })}
            error={errors.reportingManager}
          />
          <InputField
            label="Salary"
            name="salary"
            register={register("salary", {
              required: "Salary is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Salary must be a number",
              },
            })}
            error={errors.salary}
          />
          <InputField
            label="Work Time Start"
            name="workStartTime"
            type="time"
            register={register("workStartTime", {
              required: "Work start time is required",
            })}
            error={errors.workStartTime}
          />
          <InputField
            label="Work Time End"
            name="workEndTime"
            type="time"
            register={register("workEndTime", {
              required: "Work end time is required",
            })}
            error={errors.workEndTime}
          />
          <InputField
            label="Week Off"
            name="weekOff"
            type="select"
            options={["Sunday"]}
            register={register("weekOff", {
              required: "Week off is required",
            })}
            error={errors.weekOff}
          />
          <InputField
            label="Date of Birth"
            name="dob"
            type="date"
            register={register("dob", {
              required: "Date of birth is required",
              validate: (value) =>
                new Date(value) <= new Date() ||
                "Date of birth cannot be in the future",
            })}
            error={errors.dob}
          />
        </div>
      </div>
      <div className="bg-white p-6 mx-auto space-y-6 mt-3">
        <Heading text="Set Account" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white">
          <InputField
            label="Employee Type"
            name="employeeType"
            type="select"
            options={["Trainee"]}
            register={register("employeeType", {
              required: "Employee Type is required",
            })}
            error={errors.employeeType}
          />

          <InputField
            label="Mode of Work"
            name="modeOfWork"
            type="select"
            options={["Online"]}
            register={register("modeOfWork", {
              required: "Mode of Work is required",
            })}
            error={errors.modeOfWork}
          />

          <InputField
            label="User Name"
            name="username"
            register={register("username", {
              required: "User Name is required",
              minLength: {
                value: 3,
                message: "User Name should be at least 3 characters",
              },
            })}
            error={errors.userName}
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            register={register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password should be at least 6 characters",
              },
              validate: (value) =>
                /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/.test(value) ||
                "Password must include at least one letter and one number",
            })}
            error={errors.password}
          />
        </div>
      </div>

      <div className="flex justify-end gap-5 mt-5 p-6">
        <button
          type="button"
          className="bg-transparent text-red-500 px-10 py-2 rounded-md"
          onClick={() => reset()}
        >
          Discard
        </button>

        <SaveButton loading={isLoading} text="Save" loadingText="Saving..." />
      </div>
    </form>
  );
}
