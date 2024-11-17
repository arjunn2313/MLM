import React, { useState } from "react";
import TermsAndCondition from "../../../../components/Members/TermsAndCondition";
import QRCodeModal from "../../../../components/Modal/QrModal";
import SuccessModal from "../../../../components/Modal/SuccessModal";
import ErrorModal from "../../../../components/Modal/ErrorModal";
import toast from "react-hot-toast";
import { base64ToFile } from "../../../../utils/fileUtils";
import { useCreateHead } from "../../../../hooks/useSection";
import { useParams } from "react-router-dom";

export default function HeadConditions() {
  const { mutate, isPending, isError, error, isSuccess } = useCreateHead();
  const [isChecked, setIsChecked] = useState(false);
  const { districtId } = useParams();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responseModal, setResponseModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [memberId, setMemberId] = useState(null);

  const handleCheckboxChange = () => setIsChecked(!isChecked);

  const handlePayment = async () => {
    try {
      setIsModalOpen(true);
      setLoading(true);
      // Payment logic
    } catch (error) {
      setErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const localData = localStorage.getItem("formData");
      if (!localData) {
        throw new Error("No form data found in localStorage");
      }
      const data = JSON.parse(localData);
      const formData = new FormData();

      if (data.applicantPhoto) {
        const applicantPhotoFile = base64ToFile(
          data.applicantPhoto,
          "applicantPhoto.png"
        );
        console.log("Converted File:", applicantPhotoFile);
        formData.append("applicantPhoto",applicantPhotoFile);
      } else {
        throw new Error("Applicant photo is missing or invalid");
      }

      formData.append("treeName", data?.treeName);
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
      formData.append("nameOfNominee", data?.nameOfNominee);
      formData.append("relationshipWithNominee", data?.relationshipWithNominee);
      formData.append("joiningFee", data?.joiningFee);
      formData.append("status", "Un Approved");

      mutate(
        { districtId,formData},
        {
          onSuccess: (data) => {
            setMemberId(data.data.head.memberId);
            setResponseModal(true);
            setIsModalOpen(false);
          },
          onError: (error) =>
            toast.error(`Submission failed: ${error?.message}`),
        }
      );
    
    } catch (error) {
      toast.error(`Error while submitting: ${error?.message}`);
    }
  };
  return (
    <div className="container bg-white mx-auto p-4  ">
      <TermsAndCondition />

      <div className="mt-6 flex items-center p-4">
        <input
          type="checkbox"
          id="terms"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="mr-2"
        />
        <label htmlFor="terms" className="text-sm">
          I accept the Terms and Conditions
        </label>
      </div>

      <div className="flex items-end justify-end">
        <button
          className={`mt-4 px-4 py-2 rounded ${
            isChecked
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!isChecked}
          onClick={handlePayment}
        >
          Pay Now
        </button>
      </div>

      <QRCodeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        loading={loading}
        handleSubmit={handleSubmit}
        isLoading={isPending}
      />

      <SuccessModal
        isOpen={responseModal}
        onClose={() => setResponseModal(false)}
        memberId={memberId}
      />

      <ErrorModal isOpen={errorModal} onClose={() => setErrorModal(false)} />
    </div>
  );
}
