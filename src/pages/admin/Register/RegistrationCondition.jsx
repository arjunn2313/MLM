import React, { useState } from "react";
import TermsAndCondition from "../../../components/Members/TermsAndCondition";
import QRCodeModal from "../../../components/Modal/QrModal";
import SuccessModal from "../../../components/Modal/SuccessModal";
import ErrorModal from "../../../components/Modal/ErrorModal";
import { useCreateMember } from "../../../hooks/useMember";
import toast from "react-hot-toast";
import { base64ToFile } from "../../../utils/fileUtils";
import SaveButton from "../../../components/Button/saveButton";

export default function PaymentForm() {
  const { mutate, isPending, isError, error, isSuccess } = useCreateMember();
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responseModal, setResponseModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [memberId,setMemberId] = useState(null)

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
  
      let data;
      try {
        data = JSON.parse(localData);
      } catch {
        throw new Error("Invalid form data in localStorage");
      }
  
      const formData = new FormData();
  
      // Check if applicantPhoto is a valid object and contains data
      if (data.applicantPhoto && Object.keys(data.applicantPhoto).length > 0) {
        const applicantPhotoFile = base64ToFile(data.applicantPhoto, "applicantPhoto.png");
        if (!applicantPhotoFile) {
          throw new Error("Applicant photo conversion failed");
        }
        formData.append("applicantPhoto", applicantPhotoFile);
      } else {
        console.warn("Applicant photo is missing or invalid");
      }
  
      const fields = {
        name: data?.name || "",
        parentName: data?.parentInfo?.name || "",
        relation: data?.parentInfo?.relation || "",
        phoneNumber: data?.phoneNumber || "",
        whatsAppNumber: data?.whatsAppNumber || "",
        occupation: data?.occupation || "",
        dateOfBirth: data?.dateOfBirth || "",
        gender: data?.gender || "",
        maritalStatus: data?.maritalStatus || "",
        panNumber: data?.panNumber || "",
        accountNumber: data?.accountNumber || "",
        ifscCode: data?.ifscCode || "",
        bankName: data?.bankName || "",
        branchName: data?.branchName || "",
        aadharNumber: data?.aadharNumber || "",
        address: data?.address || "",
        city: data?.city || "",
        district: data?.district || "",
        state: data?.state || "",
        country: data?.country || "",
        zipCode: data?.zipCode || "",
        nameOfNominee: data?.nameOfNominee || "",
        relationshipWithNominee: data?.relationshipWithNominee || "",
        joiningFee: data?.joiningFee || "",
        status: data?.status || "Un Approved",
        placementId: data?.placementId || "",
        placementName: data?.placementName || "",
        sponsorId: data?.sponsorId || "",
      };
  
      Object.entries(fields).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });
  
      mutate(formData, {
        onSuccess: (data) =>{
          setMemberId(data.data.memberId)
          setResponseModal(true)
          setIsModalOpen(false)
        } ,
        onError: (error) => toast.error(`Submission failed: ${error.message}`),
      });
    } catch (error) {
      toast.error(`Error while submitting: ${error.message}`);
    }
  };
  
  return (
    <div className="container bg-white mx-auto p-4">
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
