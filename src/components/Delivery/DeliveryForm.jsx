import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import { useForm } from "react-hook-form";
import InputField from "../Form/InputField";
import SaveButton from "../Button/saveButton";
 

export default function DeliveryForm({
  isOpen,
  onClose,
  onSubmit,
  handleCloseModal,
  loading,
  data,
}) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset();
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4">
        <h4 className="text-sm font-medium">Invoice Number: {data?.orderId}</h4>
        <h4 className="text-sm font-medium">
          Customer Name: {data?.shippingAddress?.firstName}
        </h4>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Track Number"
            name="trackingId"
            placeholder="Enter Tracking ID"
            register={register("trackingId", {
              required: "Tracking ID required",
            })}
            error={errors.trackingId}
          />
          <InputField
            label=" Delivery Partner"
            name="deliveryPartner"
            placeholder="Enter  Delivery Partner"
            register={register("deliveryPartner", {
              required: " Delivery Partner is required",
            })}
            error={errors.deliveryPartner}
          />
          <InputField
            label=" Track link"
            name="trackingLink"
            placeholder="Enter tracking link"
            register={register("trackingLink", {
              required: "tracking is required",
            })}
            error={errors.trackingLink}
          />
        </div>

        <div className="mt-4 flex gap-3 justify-end">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
            onClick={() => reset()}
          >
            Discard
          </button>
          <SaveButton
            type="submit"
            loading={loading}
            text="Save"
            loadingText="Saving..."
          />
        </div>
      </form>
    </Modal>
  );
}
