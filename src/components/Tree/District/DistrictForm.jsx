import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../../Modal/Modal";
import InputField from "../../Form/InputField";
import SaveButton from "../../Button/saveButton";

export default function DistrictModal({
  isOpen,
  onClose,
  onSubmit,
  serverError,
  loading
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleCloseModal = () => {
    onClose();
    reset();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="New District Name"
            name="name"
            placeholder="Enter district name"
            register={register("name", {
              required: "District ame is required",
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: "District name should only contain letters",
              },
            })}
            error={errors.name}
          />

          <InputField
            label="Series Number"
            name="SerialNumber"
            placeholder="Enter Series Number"
            register={register("SerialNumber", {
              required: "Series number is required",
              minLength: {
                value: 3,
                message: "Series number must be at least 3 characters long",
              },
              maxLength: {
                value: 3,
                message: "Series number cannot exceed 3 characters",
              },
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: "Series number should only contain letters",
              },
            })}
            error={errors.SerialNumber}
          />
        </div>

        {serverError && (
          <div className="py-3 text-red-600 text-center text-md">
            {serverError}
          </div>
        )}

        <div className="mt-4 flex gap-3 justify-end">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-red-500 focus:outline-none focus:ring-0 sm:text-sm"
            onClick={() => reset()}
          >
            Discard
          </button>

          <SaveButton  loading={loading}type="submit" text="Save" loadingText="Saving..." />
        </div>
      </form>
    </Modal>
  );
}
