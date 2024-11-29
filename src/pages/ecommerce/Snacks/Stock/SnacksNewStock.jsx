import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Heading from "../../../../components/Headings/Headings";
import InputField from "../../../../components/Form/InputField";
import SaveButton from "../../../../components/Button/saveButton";
import {
  useCreateNewStock,
  useProductCategory,
} from "../../../../hooks/useProduct";

export default function SnacksNewStock() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm();
  const category = "Snacks";
  const [addNewCategory, setAddNewCategory] = useState(false);
  const { data: options } = useProductCategory(category);
  const { mutate, isPending } = useCreateNewStock();

  useEffect(() => {
    if (options?.categories?.length > 0) {
      setValue("productCategory", options.categories[0]);
    }
    if (options?.categories?.length === 0) {
      setAddNewCategory(true);
    }
  }, [options, setValue]);

  const handleChangeCategory = () => {
    setValue("productCategory", "");
    setAddNewCategory(true);
  };

  // const onSubmit = (data) => {
  //   mutate(
  //     { data, category },
  //     {
  //       onSuccess: () => reset(),
  //     }
  //   );
  // };

  const onSubmit = (data) => {
    data.category = category;
    data.variantType = "weight";
    data.totalQuantityUnit = "kg"
    mutate(
      { data, category },
      {
        onSuccess: () => reset(),
      }
    );
  };

  return (
    <div className="container bg-white mx-auto p-4 h-full">
      <Heading text="New Product" color="default" />

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-white mt-5 p-2">
          <InputField
            label="Product Code"
            name="productCode"
            placeholder="Enter productcode"
            register={register("productCode", {
              required: "productcode is required",
            })}
            error={errors.productCode}
          />

          {/* CONDITIONAL SELECT BOX (--CATEGORY) */}
          {addNewCategory ? (
            <InputField
              label="Product Category"
              name="productCategory"
              placeholder="Enter new product category"
              register={register("productCategory", {
                required: "product category is required",
              })}
              error={errors.productCategory}
            />
          ) : (
            <div>
              <label className="flex justify-between text-sm font-medium text-gray-700">
                Product Category
                <span
                  onClick={handleChangeCategory}
                  className="text-primary cursor-pointer underline"
                >
                  Add New Category{" "}
                </span>
              </label>

              <select
                className="mt-1 block w-full p-2 border rounded-md"
                {...register("productCategory", {
                  required: "Product Category is required",
                })}
              >
                {options?.categories?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}

          <InputField
            label="Product Name"
            name="productName"
            placeholder="Enter product name"
            register={register("productName", {
              required: "product Name is required",
            })}
            error={errors.productName}
          />

          <InputField
            label="Available Quantity"
            name="totalQuantity"
            placeholder="Enter Quantity"
            register={register("totalQuantity", {
              required: "quantity  is required",
              valueAsNumber: true,
            })}
            error={errors.totalQuantity}
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
