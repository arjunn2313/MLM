import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import { useForm } from "react-hook-form";
import InputField from "../Form/InputField";
import SaveButton from "../Button/saveButton";
import { TextAreaField } from "../Form/TextArea";
import RadioField from "../Form/RadioField";

export default function ExpenseForm({
  isOpen,
  onClose,
  onSubmit,
  handleCloseModal,
  loading,
  options,
}) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [addNewCategory, setAddNewCategory] = useState(false);

  useEffect(() => {
    if (options?.length > 0) {
      setValue("category", options[0]);
    }
    if (options?.length === 0) {
      setAddNewCategory(true);
    }
  }, [options, setValue]);

  useEffect(() => {
    reset();
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Date"
            name="date"
            type="date"
            placeholder="Enter date "
            register={register("date", {
              required: "Date is required",
              validate: (value) => {
                const selectedDate = new Date(value);
                const currentDate = new Date();
                return (
                  selectedDate <= currentDate || "Date cannot be in the future"
                );
              },
            })}
            error={errors.date}
          />

          {addNewCategory ? (
            <InputField
              label="Category"
              name="category"
              placeholder="Enter  category"
              register={register("category", {
                required: "category is required",
              })}
              error={errors.category}
            />
          ) : (
            <div>
              <label className="flex justify-between text-sm font-medium text-gray-700">
                Category
                <span
                  onClick={() => {
                    setAddNewCategory(true);
                    setValue("category", "");
                  }}
                  className="text-primary cursor-pointer underline"
                >
                  Add New Category{" "}
                </span>
              </label>

              <select
                className="mt-1 block w-full p-2 border rounded-md"
                {...register("category", {
                  required: "Category is required",
                })}
              >
                {options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}

          <InputField
            label="Sub Category"
            name="subCategory"
            placeholder="Enter sub category"
            register={register("subCategory", {
              required: "Sub category is required",
            })}
            error={errors.subCategory}
          />
          <InputField
            label="Amount"
            name="amount"
            placeholder="Enter amount"
            register={register("amount", {
              required: "Amount is required",
            })}
            error={errors.amount}
          />
          <InputField
            label="Spent For"
            name="spentFor"
            placeholder="Enter spent for"
            register={register("spentFor", {
              required: "spent for is required",
            })}
            error={errors.spentFor}
          />

          <div className="col-span-2">
            <TextAreaField
              label="Description"
              name="description"
              placeholder="Enter  description"
              register={register}
              error={errors.description}
            />
          </div>

          <RadioField
            label="Status"
            name="status"
            register={register}
            options={[
              {
                value: "paid",
                label: "Paid",
                color: "text-green-500",
                textColor: "text-green-500",
              },
              {
                value: "un paid",
                label: "Unpaid",
                color: "text-red-500",
                textColor: "text-red-500",
              },
            ]}
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
