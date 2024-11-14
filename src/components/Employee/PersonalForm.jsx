import React from "react";
import { useForm } from "react-hook-form";
import FileUploadField from "../Form/FileUpload";
import InputField from "../Form/InputField";
import RadioField from "../Form/RadioField";
import TextareaField from "../Form/TextArea";

export default function PersonalForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const statusOptions = [
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

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-white p-6  mx-auto space-y-6 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white">
          <FileUploadField
            label="Employee Photo"
            name="employeePhoto"
            register={register}
            error={errors.employeePhoto}
          />

          <InputField
            label="Mode of work"
            name="modeOfWork"
            options={["online"]}
            register={register("modeOfWork", {
              required: "Mode of work is required",
            })}
            error={errors.modeOfWork}
          />
          {/* First Education Qualification */}
          <InputField
            label="Education Qualification"
            name="educationQualifications.0.degree"
            register={register("educationQualifications.0.degree", {
              required: "Education qualification is required",
              minLength: { value: 2, message: "Minimum 2 characters required" },
            })}
            error={errors.educationQualifications?.[0]?.degree}
          />
          <FileUploadField
            label="Upload PDF"
            name="educationQualifications.0.document"
            register={register}
            error={errors.educationQualifications?.[0]?.document}
          />

          {/* Second Education Qualification */}
          <InputField
            label="Education Qualification"
            name="educationQualifications.1.degree"
            register={register("educationQualifications.1.degree", {
              minLength: { value: 2, message: "Minimum 2 characters required" },
            })}
            error={errors.educationQualifications?.[1]?.degree}
          />
          <FileUploadField
            label="Upload PDF"
            name="educationQualifications.1.document"
            register={register}
            error={errors.educationQualifications?.[1]?.document}
          />

          {/* Contact Information */}
          <InputField
            label="Phone Number"
            name="phoneNumber"
            register={register("phoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Invalid phone number",
              },
            })}
            error={errors.phoneNumber}
          />
          <InputField
            label="Alternative Phone Number"
            name="altPhoneNumber"
            register={register("altPhoneNumber", {
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Invalid phone number",
              },
            })}
            error={errors.altPhoneNumber}
          />
          <InputField
            label="Email (Office)"
            name="officeEmail"
            register={register("officeEmail", {
              required: "Office email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
            })}
            error={errors.officeEmail}
          />
          <InputField
            label="Email (Personal)"
            name="personalEmail"
            register={register("personalEmail", {
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
            })}
            error={errors.personalEmail}
          />
          {/* Blood Group and Aadhaar Number */}
          <InputField
            label="Blood Group"
            name="bloodGroup"
            register={register("bloodGroup", {
              required: "Blood group is required",
            })}
            error={errors.bloodGroup}
          />
          <InputField
            label="Aadhaar Number"
            name="aadhaarNumber"
            register={register("aadhaarNumber", {
              required: "Aadhaar number is required",
              pattern: {
                value: /^[0-9]{12}$/,
                message: "Invalid Aadhaar number",
              },
            })}
            error={errors.aadhaarNumber}
          />
          {/* Present Address */}
          <div className="md:col-span-1 space-y-4">
            <h3 className="font-semibold mb-2">Address (Present)</h3>
            <InputField
              placeholder="Address Line 1"
              name="addressPresent.addressLine1"
              register={register("addressPresent.addressLine1", {
                required: "Address Line 1 is required",
              })}
              error={errors.addressPresent?.addressLine1}
            />
            <InputField
              placeholder="Address Line 2"
              name="addressPresent.addressLine2"
              register={register("addressPresent.addressLine2")}
              error={errors.addressPresent?.addressLine2}
            />
            <InputField
              placeholder="City"
              name="addressPresent.city"
              register={register("addressPresent.city", {
                required: "City is required",
              })}
              error={errors.addressPresent?.city}
            />
            <InputField
              placeholder="District"
              name="addressPresent.district"
              register={register("addressPresent.district", {
                required: "District is required",
              })}
              error={errors.addressPresent?.district}
            />
            <InputField
              placeholder="State"
              name="addressPresent.state"
              register={register("addressPresent.state", {
                required: "State is required",
              })}
              error={errors.addressPresent?.state}
            />
            <InputField
              placeholder="Country"
              name="addressPresent.country"
              register={register("addressPresent.country", {
                required: "Country is required",
              })}
              error={errors.addressPresent?.country}
            />
            <InputField
              placeholder="Zip Code"
              name="addressPresent.zipCode"
              register={register("addressPresent.zipCode", {
                required: "Zip Code is required",
                pattern: {
                  value: /^[0-9]{5}$/,
                  message: "Zip Code must be a 5-digit number",
                },
              })}
              error={errors.addressPresent?.zipCode}
            />
          </div>

          {/* Permanent Address */}
          <div className="md:col-span-1 space-y-4">
            <h3 className="font-semibold mb-2">Address (Permanent)</h3>
            <InputField
              placeholder="Address Line 1"
              name="addressPermanent.addressLine1"
              register={register("addressPermanent.addressLine1", {
                required: "Address Line 1 is required",
              })}
              error={errors.addressPermanent?.addressLine1}
            />
            <InputField
              placeholder="Address Line 2"
              name="addressPermanent.addressLine2"
              register={register("addressPermanent.addressLine2")}
              error={errors.addressPermanent?.addressLine2}
            />
            <InputField
              placeholder="City"
              name="addressPermanent.city"
              register={register("addressPermanent.city", {
                required: "City is required",
              })}
              error={errors.addressPermanent?.city}
            />
            <InputField
              placeholder="District"
              name="addressPermanent.district"
              register={register("addressPermanent.district", {
                required: "District is required",
              })}
              error={errors.addressPermanent?.district}
            />
            <InputField
              placeholder="State"
              name="addressPermanent.state"
              register={register("addressPermanent.state", {
                required: "State is required",
              })}
              error={errors.addressPermanent?.state}
            />
            <InputField
              placeholder="Country"
              name="addressPermanent.country"
              register={register("addressPermanent.country", {
                required: "Country is required",
              })}
              error={errors.addressPermanent?.country}
            />
            <InputField
              placeholder="Zip Code"
              name="addressPermanent.zipCode"
              register={register("addressPermanent.zipCode", {
                required: "Zip Code is required",
                pattern: {
                  value: /^[0-9]{5}$/,
                  message: "Zip Code must be a 5-digit number",
                },
              })}
              error={errors.addressPermanent?.zipCode}
            />
          </div>

          <InputField
            label="Account Number"
            name="accountNumber"
            register={register}
          />
          <InputField label="IFSC Code" name="ifdcCode" register={register} />
          <InputField label="Bank Name" name="bankName" register={register} />
          <InputField label="PAN Number" name="panNumber" register={register} />
        </div>
      </div>

      <div className="bg-white p-6  mx-auto space-y-6 mt-3">
        <RadioField
          label="Status"
          name="status"
          register={register}
          options={statusOptions}
        />
        <TextareaField
          label="Reason for Inactive"
          name="reasonForInactive"
          register={register}
        />
      </div>

      <div className="flex justify-end gap-5 mt-5 p-6">
        <button className="bg-transparent text-red-500 px-10 py-2 rounded-md">
          Discard
        </button>
        {/* <SaveButton loading={isLoading} text="Save" loadingText="Saving..." /> */}
      </div>
    </form>
  );
}
