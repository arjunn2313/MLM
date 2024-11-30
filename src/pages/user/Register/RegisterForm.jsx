import React from "react";
import { useForm } from "react-hook-form";
import Heading from "../../../components/Headings/Headings";
import InputField from "../../../components/Form/InputField";
import SelectGroup from "../../../components/Form/SelectGroup";
import { PhoneNumber } from "../../../components/Form/PhoneNumber";
import FileUploadField from "../../../components/Form/FileUpload";
import SaveButton from "../../../components/Button/saveButton";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm();

  const onSubmit = () => {};
  return (
    <div className="container bg-white mx-auto p-4">
      <Heading text="Registration Form" color="default" />
      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-white mt-5 p-2">
          <InputField
            label="Name of Applicant"
            name="name"
            placeholder="Enter name"
            register={register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name should be at least 3 characters",
              },
            })}
            error={errors.name}
          />
          <SelectGroup
            label="Parent Information"
            placeholder="Enter parent name"
            options={["S/O", "D/O", "W/O"]}
            selectName="parentInfo.relation"
            inputName="parentInfo.name"
            register={register}
            watch={watch}
            setValue={setValue}
            error={errors.parentInfo?.name}
          />

          <PhoneNumber
            label="Phone Number"
            defaultCountry="IN"
            placeholder="Enter phone number"
            // isSuccess={isSuccess}
            // isError={phoneError}
            // isLoading={phoneLoading}
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

          <PhoneNumber
            label="Whatsapp Number"
            defaultCountry="IN"
            placeholder="Enter whatsapp number"
            value={watch("whatsAppNumber")}
            onChange={(value) => setValue("whatsAppNumber", value)}
            error={errors.whatsAppNumber}
            register={register("whatsAppNumber", {
              required: "Whatsapp number is required",
              validate: (value) => {
                if (!value) return "Whatsapp number is required";
                if (value.length < 10)
                  return "Phone number must be at least 10 digits";
                return true;
              },
            })}
          />

          <InputField
            label="Occupation"
            name="occupation"
            placeholder="Enter Occupation"
            register={register("occupation", {
              required: "Occupation  is required",
            })}
            error={errors.occupation}
          />

          <InputField
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            register={register("dateOfBirth", {
              required: "Date of birth is required",
              validate: (value) =>
                new Date(value) <= new Date() ||
                "Date of birth cannot be in the future",
            })}
            error={errors.dateOfBirth}
          />

          <InputField
            label="Gender"
            name="gender"
            type="select"
            options={["Male", "Female", "Other"]}
            register={register("gender", {
              required: "Gender is required",
            })}
            error={errors.gender}
          />

          <InputField
            label="Marital Status"
            name="maritalStatus"
            type="select"
            options={["Single", "Married", "Other"]}
            register={register("maritalStatus", {
              required: "Marital status is required",
            })}
            error={errors.maritalStatus}
          />

          <InputField
            label="Pan Number"
            name="panNumber"
            placeholder="Enter PAN number"
            register={register("panNumber", {
              required: "PAN number is required",
            })}
            error={errors.panNumber}
          />

          <InputField
            label="Account Number"
            name="accountNumber"
            placeholder="Enter account number"
            register={register("accountNumber", {
              required: "Account number is required",
            })}
            error={errors.accountNumber}
          />

          <InputField
            label="IFSC Code"
            name="ifscCode"
            placeholder="Enter IFSC Code"
            register={register("ifscCode", {
              required: "IFSC code is required",
            })}
            error={errors.ifscCode}
          />
          <InputField
            label="Bank Name"
            name="bankName"
            placeholder="Enter bank name"
            register={register("bankName", {
              required: "Bank name is required",
            })}
            error={errors.bankName}
          />
          <InputField
            label="Branch Name"
            name="branchName"
            placeholder="Enter Branch Name"
            register={register("branchName", {
              required: "Branch name is required",
            })}
            error={errors.branchName}
          />
          <InputField
            label="Adhaar Number"
            name="aadharNumber"
            placeholder="Enter Adhaar number"
            register={register("aadharNumber", {
              required: "Adhaar  number is required",
            })}
            error={errors.aadharNumber}
          />
          <InputField
            label="Address"
            placeholder="Enter address"
            name="address"
            register={register("address", {
              required: "Address is required",
            })}
            error={errors.address}
          />
          <InputField
            label="City"
            name="city"
            placeholder="Enter city"
            register={register("city", {
              required: "City is required",
            })}
            error={errors.city}
          />

          <InputField
            label="District"
            name="district"
            placeholder="Enter district"
            register={register("district", {
              required: "District is required",
            })}
            error={errors.district}
          />

          <InputField
            label="State"
            name="state"
            placeholder="Enter state"
            register={register("state", {
              required: "State is required",
            })}
            error={errors.state}
          />

          <InputField
            label="Country"
            name="country"
            placeholder="Enter country"
            register={register("country", {
              required: "Country is required",
            })}
            error={errors.country}
          />

          <InputField
            label="Zipcode"
            name="zipCode"
            placeholder="Enter zipcode"
            register={register("zipCode", {
              required: "Zipcode is required",
              pattern: {
                value: /^[0-9]{5,6}$/,
                message: "Zipcode must be 5-6 digits",
              },
            })}
            error={errors.zipCode}
          />

          <InputField
            label="Name of the Nominee"
            name="nameOfNominee"
            placeholder="Enter nominee name"
            register={register("nameOfNominee", {
              required: "Nominee name is required",
            })}
            error={errors.nameOfNominee}
          />

          <InputField
            label="Relationship with Nominee"
            placeholder="Enter relationship"
            name="relationshipWithNominee"
            register={register("relationshipWithNominee", {
              required: "Relationship is required",
            })}
            error={errors.relationshipWithNominee}
          />

          <InputField
            label="Sponsor ID"
            placeholder="Enter sponsor ID"
            // isError={sponsorError}
            // isLoading={sponsorLoading}
            name="sponsorId"
            onChange={(value) => setValue("sponsorId", value)}
            value={watch("sponsorId")}
            register={register("sponsorId", {
              required: "Sponsor ID is required",
            })}
            error={errors.sponsorId}
          />

          {/* <div className="flex items-center  justify-around  ">
            <span>
              Sponsor Name :{" "}
              <span className="text-blue-500 font-medium">
                {sponsorData?.name}
              </span>
            </span>
            <span>
              Sponsor Placement Level :{" "}
              <span className="text-blue-500 font-medium">
                {sponsorData?.applicantPlacementLevel}
              </span>
            </span>
          </div> */}

          <InputField
            label="Placement ID"
            placeholder="Enter Placement ID"
            name="placementId"
            // disabled={sponsorIdRef}
            // isError={placementError}
            // isLoading={placementLoading}
            onChange={(value) => setValue("placementId", value)}
            value={watch("placementId")}
            register={register("placementId", {
              required: "Placement ID is required",
            })}
            error={errors.placementId}
          />

          {/* <div className="flex items-center  justify-around  ">
            <span>
              Placement Member Name :{" "}
              <span className="text-blue-500 font-medium">
                {placementData?.name}
              </span>
            </span>
            <span>
              Placement Member Level :{" "}
              <span className="text-blue-500 font-medium">
                {placementData?.applicantPlacementLevel}
              </span>
            </span>
          </div> */}

          <InputField
            label="Applicant Placement Level"
            placeholder="Enter placement level"
            name="applicantPlacementLevel"
            disabled={true}
            register={register("applicantPlacementLevel", {
              required: "Placement level is required",
            })}
            error={errors.applicantPlacementLevel}
          />

          <div></div>

          <InputField
            label="Joining Fee"
            name="joiningFee"
            register={register("joiningFee")}
            error={errors.joiningFee}
            disabled={true}
          />

          <FileUploadField
            label="Applicant Photo"
            name="applicantPhoto"
            register={register}
            error={errors.applicantPhoto}
          />
        </div>
        <div className="flex justify-end gap-5 mt-5 p-6">
          <button
            type="button"
            className="bg-transparent text-red-500 px-10 py-2 rounded-md"
            onClick={() => reset()}
          >
            Discard
          </button>

          <SaveButton
            type="submit"
            // loading={joiningFeeLoading}
            text="Next"
            loadingText="Saving..."
          />
        </div>
      </form>
    </div>
  );
}
