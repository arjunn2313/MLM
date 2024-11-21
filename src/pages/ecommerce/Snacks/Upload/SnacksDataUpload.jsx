import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import Heading from "../../../../components/Headings/Headings";
import InputField from "../../../../components/Form/InputField";
import SaveButton from "../../../../components/Button/saveButton";
import FileUploadField from "../../../../components/Form/FileUpload";
import { useCheckProduct, useUpdateProductInstance } from "../../../../hooks/useProduct";

export default function SnacksDataUpload() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
    control,
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "weights",
  });

  const weights = watch("weights");
  const mlmDiscount = watch("mlmDiscount");
  const referralDiscount = watch("referralDiscount");
  const normalDiscount = watch("normalDiscount");
  const productCode = watch("productCode");

  const { data, isLoading, error: productError } = useCheckProduct(productCode);
  const {mutate,isPending} = useUpdateProductInstance()

  useEffect(() => {
    if (fields.length === 0) {
      append({ weight: "", unit: "gms", price: "" });
    }
  }, [append, fields.length]);

  useEffect(() => {
    if (data) {
      setValue("productCategory", data?.productCategory);
      setValue("productName", data?.productName);
    }
  }, [data, setValue]);

  const onSubmit = (data) => {
    try {
      const formData = new FormData();
      const fields = [
        "productCode",
        "productCategory",
        "productName",
        "gst",
        "mlmDiscount",
        "referralDiscount",
        "normalDiscount",
      ];
      fields.forEach((field) => formData.append(field, data[field]));

      formData.append("category", "Snacks");

      data.weights.forEach(({ weight, unit, price }, index) => {
        formData.append(`weight[${index}][value]`, weight);
        formData.append(`weight[${index}][unit]`, unit);
        formData.append(`weight[${index}][price]`, price);
        formData.append(`weight[${index}][mlmPrice]`, parseInt(discountDetails[index].mlmDiscountedPrice));
        formData.append(`weight[${index}][normalPrice]`, parseInt(discountDetails[index].normalDiscountedPrice));
        formData.append(`weight[${index}][referralPrice]`, parseInt(discountDetails[index].referralDiscountedPrice));
      });
      console.log(data);

      if (data.photo) {
        Array.from(data.photo).forEach((file) => formData.append("productImage", file));
      }
    
      
 
      // for (let [key, value] of formData.entries()) {
      //   console.log(`${key}:`, value);
      // }

      mutate({formData,productCode})
    } catch (error) {
      console.log(error);
    }
  };

  const discountDetails = weights?.map((wp) => {
    const price = parseFloat(wp.price) || 0;
    return {
      weight: wp.weight,
      unit: wp.unit,
      originalPrice: price,
      mlmDiscountAmount: (price * (parseFloat(mlmDiscount) || 0)) / 100,
      referralDiscountAmount:
        (price * (parseFloat(referralDiscount) || 0)) / 100,
      normalDiscountAmount: (price * (parseFloat(normalDiscount) || 0)) / 100,
      mlmDiscountedPrice: (
        price -
        (price * (parseFloat(mlmDiscount) || 0)) / 100
      ).toFixed(2),
      referralDiscountedPrice: (
        price -
        (price * (parseFloat(referralDiscount) || 0)) / 100
      ).toFixed(2),
      normalDiscountedPrice: (
        price -
        (price * (parseFloat(normalDiscount) || 0)) / 100
      ).toFixed(2),
    };
  });


  
  



  return (
    <div className="container bg-white mx-auto p-4 min-h-full">
      <Heading text="New Product" color="default" />

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
            isProduct={isLoading}
            productError={productError}
          />

          <InputField
            label="Product Category"
            name="productCategory"
            placeholder="Enter new product category"
            register={register("productCategory", {
              required: "product category is required",
            })}
            error={errors.productCategory}
            disabled={true}
          />

          <InputField
            label="Product Name"
            name="productName"
            placeholder="Enter product name"
            register={register("productName", {
              required: "product Name is required",
            })}
            error={errors.productName}
            disabled={true}
          />

          <InputField
            label="GST"
            name="gst"
            placeholder="Enter gst"
            register={register("gst", {
              required: "GST is required",
            })}
            error={errors.gst}
          />

          <InputField
            label="MLM Discount"
            name="mlmDiscount"
            placeholder="Enter mlm discount"
            register={register("mlmDiscount", {
              required: "mlm discount is required",
            })}
            error={errors.mlmDiscount}
          />

          <InputField
            label="Referral Discount"
            name="referralDiscount"
            placeholder="Enter referral discount"
            register={register("referralDiscount", {
              required: "referal discount is required",
            })}
            error={errors.referralDiscount}
          />

          <InputField
            label="Normal Discount"
            name="normalDiscount"
            placeholder="Enter gst"
            register={register("normalDiscount", {
              required: "Normal discount is required",
            })}
            error={errors.normalDiscount}
          />

          <FileUploadField
            label="Product Image"
            name="photo"
            register={register}
            error={errors.photo}
            multiple={true}
          />
        </div>

        {/* Dynamic fields for weight and price */}
        <div className="mt-5 p-2 w-full">
          <div className="flex justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Weight & Price
            </label>
            <button
              type="button"
              className="text-primary underline"
              onClick={() => append({ weight: "", price: "" })}
            >
              Add More
            </button>
          </div>
          {fields.map((item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2"
            >
              <div className="flex items-center border mt-1 rounded-md overflow-hidden ">
                <input
                  type="text"
                  className="flex-1 px-4 py-2 border-none focus:outline-none"
                  placeholder="Enter weight"
                  {...register(`weights.${index}.weight`, {
                    required: "Weight is required",
                  })}
                />
                <select
                  className="h-full bg-gray-100 px-4 py-2 focus:outline-none border-none"
                  {...register(`weights.${index}.unit`, {
                    required: "Unit is required",
                  })}
                >
                  <option value="gms">gms</option>
                  <option value="kg">kg</option>
                </select>
              </div>

              <InputField
                name={`weights[${index}].price`}
                placeholder="Enter price"
                register={register(`weights.${index}.price`, {
                  required: "Price is required",
                })}
                error={errors.weights?.[index]?.price}
              />

              {discountDetails[index] && (
                <div className="ml-4 flex justify-around items-center text-sm text-green-500 col-span-2">
                  <p>
                    MLM Discounted Price: ₹
                    {discountDetails[index].mlmDiscountedPrice}
                  </p>
                  <p>
                    Referral Discounted Price: ₹
                    {discountDetails[index].referralDiscountedPrice}
                  </p>
                  <p>
                    Normal Discounted Price: ₹
                    {discountDetails[index].normalDiscountedPrice}
                  </p>
                </div>
              )}

              {/* <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={() => remove(index)}
              >
                Remove
              </button> */}
            </div>
          ))}
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
