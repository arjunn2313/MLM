import React from "react";
import { useForm } from "react-hook-form";
import Heading from "../../../components/Headings/Headings";
import InputField from "../../../components/Form/InputField";
import SelectGroup from "../../../components/Form/SelectGroup";
import { PhoneNumber } from "../../../components/Form/PhoneNumber";
import FileUploadField from "../../../components/Form/FileUpload";
import SaveButton from "../../../components/Button/saveButton";
import { useCheckPhoneNumber } from "../../../hooks/useMember";
import { useFilter } from "../../../hooks/useSection";
import { useCreateDistrictHead } from "../../../hooks/useDistrict";
import { useNavigate } from "react-router-dom";

export default function HeadRegForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm();

  const phoneNumber = watch("phoneNumber");
  const navigate = useNavigate()

  const {
    data: phoneExists,
    isLoading: phoneLoading,
    isSuccess,
    error: phoneError,
  } = useCheckPhoneNumber(phoneNumber);

  const { data: filter, error } = useFilter();

  const {mutate,isPending} = useCreateDistrictHead();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("districtName", data?.districtName);
      formData.append("name", data?.name);
      formData.append("parentName", data?.parentInfo?.name);
      formData.append("relation", data?.parentInfo?.relation);
      formData.append("phoneNumber", data?.phoneNumber);
      formData.append("whatsAppNumber", data?.whatsAppNumber);
      formData.append("occupation", data?.occupation);
      formData.append("dateOfBirth", data?.dateOfBirth);
      formData.append("gender", data?.gender);
      formData.append("maritalStatus", data?.maritalStatus);
      formData.append("panNumber", data?.panNumber);
      formData.append("accountNumber", data?.accountNumber);
      formData.append("ifscCode", data?.ifscCode);
      formData.append("bankName", data?.bankName);
      formData.append("branchName", data?.branchName);
      formData.append("aadharNumber", data?.aadharNumber);
      formData.append("address", data?.address);
      formData.append("city", data?.city);
      formData.append("district", data?.district);
      formData.append("state", data?.state);
      formData.append("country", data?.country);
      formData.append("zipCode", data?.zipCode);
      if (data?.applicantPhoto) {
        formData.append("applicantPhoto", data?.applicantPhoto[0]);
      } else {
        alert("Applicant photo is required");
        return;
      }
      mutate(formData,{
        onSuccess: () =>{
          navigate("/district-head")
        }
      })
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container bg-white mx-auto p-4">
      <Heading text="Registration Form" color="default" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-white mt-5 p-2">
          <InputField
            label="District Name"
            name="districtName"
            type="select"
            options={filter?.districtNames}
            register={register("districtName", {
              required: "District name is required",
            })}
            error={errors.districtName}
          />
          <div></div>
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
            isSuccess={isSuccess}
            isError={phoneError}
            isLoading={phoneLoading}
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
            loading={isPending}
            text="Save"
            loadingText="Saving..."
          />
        </div>
      </form>
    </div>
  );
}
