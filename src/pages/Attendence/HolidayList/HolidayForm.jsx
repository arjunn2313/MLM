import React from "react";
import Heading from "../../../components/Headings/Headings";
import { useForm } from "react-hook-form";
import InputField from "../../../components/Form/InputField";
import CheckboxField from "../../../components/Form/CheckBox";
import RadioField from "../../../components/Form/RadioField";

export default function HolidayForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const isLoading = false;

  const onSubmit = (data) => {
    console.log(data);
  };

  const statusOptions = [
    {
        value: "pending",
        label: "Pending",
        color: "text-yellow-500",
        textColor: "text-yellow-600",
      },
    {
      value: "active",
      label: "Active",
      color: "text-green-500",
      textColor: "text-green-600",
    },
    {
      value: "inactive",
      label: "In Active",
      color: "text-red-500",
      textColor: "text-red-600",
    },
  ];

  const leaveTypes = [
    {
      value: "office",
      label: "Office",
      color: "text-green-500",
      textColor: "text-green-600",
    },
    {
      value: "optional",
      label: "Optional",
      color: "text-yellow-500",
      textColor: "text-yellow-600",
    },
    {
      value: "government",
      label: "Government",
      color: "text-red-500",
      textColor: "text-red-600",
    },
  ];

  return (
    <div className="container bg-white mx-auto p-4 ">
      <Heading text="Add Holiday" />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white">
          <InputField
            label="Leave Name"
            name="leaveName"
            type="date"
            register={register("leaveName", {
              required: "Leave Name is required",
            })}
            error={errors.leaveName}
          />{" "}
          <br />
          <div className="col-span-2">
            <InputField
              label="Event"
              name="event"
              type="text"
              register={register("event", {
                required: "Event is required",
              })}
              error={errors.description}
            />
          </div>
          <CheckboxField
            label="Repeat for every year"
            name="repeatForEveryYear"
            register={register}
            error={errors.repeatForEveryYear}
          />
          <div className="col-span-2">
            <RadioField
              label="Leave Type"
              name="leaveType"
              register={register}
              options={leaveTypes}
            />
          </div>
          <div className="col-span-2">
          <RadioField
            label="Status"
            name="status"
            register={register}
            options={statusOptions}
          />
          </div>
        </div>
      </form>
    </div>
  );
}
