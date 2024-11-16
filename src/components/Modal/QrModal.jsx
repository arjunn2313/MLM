import React from "react";
import QRCode from "../../assets/qr.png";
import LoadingBox from "../Loaders/LoadingBox";
import Modal from "./Modal";

export default function QRCodeModal({ isOpen, onClose, loading,handleSubmit,isLoading }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {loading ? (
        <div className="flex items-center justify-center">
          <LoadingBox width="w-full" height="h-24" rounded="rounded-md" />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <p className="text-blue-500 font-semibold text-xl">SIP</p>
          <img src={QRCode} alt="QR code" />
          <span className="text-sm py-2 text-gray-600">
            <span className="text-black font-medium">Note:</span> After a
            successful payment, click on the Payment Completed button. We will
            review your application and provide approval within 24 hours.
          </span>
          <button
            className="bg-blue-500 text-white p-2 px-4 rounded mt-2"
            onClick={handleSubmit}
          >
          {isLoading ? "Payment Completed....." : "Payment Completed"}  
          </button>
        </div>
      )}
    </Modal>
  );
}
