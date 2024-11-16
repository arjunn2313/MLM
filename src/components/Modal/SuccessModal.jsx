import React from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

export default function SuccessModal({ isOpen, onClose, memberId }) {
  const navigate = useNavigate();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center">
        <p className="text-green-500 font-semibold text-xl">Thank You!</p>
        <p className="text-gray-600 text-center mt-2">
          Your registration was successful. We will review your details and get
          back to you soon.
        </p>
        <div className="flex gap-5">
          <button
            className="text-red-500 p-2 px-4 rounded mt-4 border border-red-500"
            onClick={onClose}
          >
            Back Home
          </button>

          <button
            className="bg-blue-500 text-white p-2 px-4 rounded mt-4"
            onClick={() => navigate(`/register/preview/${memberId}`)}
          >
            Show Preview
          </button>
        </div>
      </div>
    </Modal>
  );
}
