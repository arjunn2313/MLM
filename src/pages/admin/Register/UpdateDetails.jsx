import React, { useEffect, useState } from "react";
import Heading from "../../../components/Headings/Headings";
import { useForm } from "react-hook-form";
import InputField from "../../../components/Form/InputField";
import SaveButton from "../../../components/Button/saveButton";
import FileUploadField from "../../../components/Form/FileUpload";
import {
  useMemberDetails,
  useUpdateMemberDetails,
} from "../../../hooks/useMember";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import Spinner from "../../../components/loaders/Spinner";

export default function UpdateDetails() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm();
  const { mutate, isPending, isError, error, isSuccess } =
    useUpdateMemberDetails();
  const { memberId } = useParams();
  const { data, isLoading } = useMemberDetails(memberId);

  useEffect(() => {
    if (data) {
      setValue("name", data.name);
      setValue("parentInfo", {
        name: data.parentName,
        relation: data.relation,
      });
      setValue("whatsAppNumber", data.whatsAppNumber);
      setValue(
        "dateOfBirth",
        moment(new Date(data?.dateOfBirth)).format("DD-MM-YYYY")
      );
      setValue("gender", data.gender);
      setValue("occupation", data.occupation);
      setValue("maritalStatus", data.maritalStatus);
      setValue("panNumber", data.panNumber);
      setValue("accountNumber", data.accountNumber);
      setValue("branchName", data.branchName);
      setValue("ifscCode", data.ifscCode);
      setValue("bankName", data.bankName);
      setValue("address", data.address);
      setValue("city", data.city);
      setValue("aadharNumber", data.aadharNumber);
      setValue("district", data.district);
      setValue("state", data.state);
      setValue("country", data.country);
      setValue("zipCode", data.zipCode);
      setValue("nameOfNominee", data.nameOfNominee);
      setValue("relationshipWithNominee", data.relationshipWithNominee);
      setValue("joiningFee", data.joiningFee);
    }
  }, [data, setValue]);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Append all data except for applicantPhoto
    Object.keys(data).forEach((key) => {
      if (key !== "applicantPhoto") {
        formData.append(key, data[key]);
      }
    });

    // Append applicantPhoto if it exists
    if (data?.applicantPhoto) {
      formData.append("applicantPhoto", data.applicantPhoto[0]);
    }

    try {
      mutate({ formData, memberId });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (isLoading) return <Spinner size="10" borderSize="3" />;

  return (
    <div className="container bg-white mx-auto p-4">
      <Heading text="Update Member" color="default" />
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
          <div className="flex flex-col">
            <label className=" block text-sm font-medium text-gray-700 mb-1">
              Upload Applicant Photo
            </label>
            <input
              type="file"
              id="applicantPhoto"
              name="applicantPhoto"
              accept="image/*"
              className=" block w-full  p-2 border border-primary border-dashed rounded-md focus:outline-none focus:ring"
              {...register("applicantPhoto")}
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

          <SaveButton type="submit" text="Next" loadingText="Saving..." />
        </div>
      </form>
    </div>
  );
}
