import React from "react";
import Modal from "./Modal";
 

export default function ErrorModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center">
        <p className="text-red-500 font-semibold text-xl">
          Registration Failed
        </p>
        <p className="text-gray-600 text-center mt-2">
          An error occurred during registration. Please try again later.
        </p>
        <button
          className="bg-red-500 text-white p-2 px-4 rounded mt-4"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </Modal>
  );
}
