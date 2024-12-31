import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Heading from "../../../../components/Headings/Headings";
import InputField from "../../../../components/Form/InputField";
import FileUploadField from "../../../../components/Form/FileUpload";
import SaveButton from "../../../../components/Button/saveButton";
import {
  useProductDetails,
  useUpdateProductInstance,
} from "../../../../hooks/useProduct";
import { useParams } from "react-router-dom";

export default function CrackersUpdate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm();
 const { id } = useParams();
  const { data:productData, isLoading, error: productError } = useProductDetails(id); 
   const { mutate, isPending } = useUpdateProductInstance();

  const calculateDiscountedPrice = (price, discount) => {
    return (price - (price * discount) / 100).toFixed(2);
  };

  const { mlmDiscount, referralDiscount, normalDiscount, referralIdDiscount, price } = watch();

  useEffect(() => {
    if (productData) {
      reset(productData);
    }
  }, [productData, reset]);

  const onSubmit = (data) => {
    const updateData = {};
 
    
    // Add only necessary fields
    if (data.productCode) updateData.productCode = data.productCode;
    if (data.productCategory) updateData.productCategory = data.productCategory;
    if (data.productName) updateData.productName = data.productName;
    if (data.gst) updateData.gst = data.gst;
  
    // Set default category
    updateData.category = "Crackers";
  
    // Update using mutate
    mutate(
      { productCode: data.productCode, updateData },
      {
        onSuccess: () => reset(),
      }
    );
  };
  

  return (
    <div className="container bg-white mx-auto p-4 min-h-full">
      <Heading text="Update Product" color="default" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-white mt-5 p-2">
          <InputField
            label="Product Code"
            name="productCode"
            placeholder="Enter product code"
            register={register("productCode", {
              required: "Product code is required",
            })}
            error={errors.productCode}
          />

          <InputField
            label="Product Category"
            name="productCategory"
            placeholder="Enter product category"
            register={register("productCategory", {
              required: "Product category is required",
            })}
            error={errors.productCategory}
          />

          <InputField
            label="Product Name"
            name="productName"
            placeholder="Enter product name"
            register={register("productName", {
              required: "Product name is required",
            })}
            error={errors.productName}
          />

          <InputField
            label="GST"
            name="gst"
            placeholder="Enter GST"
            register={register("gst", {
              required: "GST is required",
              valueAsNumber: true,
            })}
            error={errors.gst}
          />

   

          {/* <InputField
            label="Price"
            name="price"
            placeholder="Enter price"
            register={register("price", {
              required: "Price is required",
              valueAsNumber: true,
            })}
            error={errors.price}
          />

          <InputField
            label="MLM Discount"
            name="mlmDiscount"
            placeholder="Enter MLM discount"
            register={register("mlmDiscount", {
              required: "MLM discount is required",
              valueAsNumber: true,
            })}
            error={errors.mlmDiscount}
          />

          <InputField
            label="Referral Discount"
            name="referralDiscount"
            placeholder="Enter referral discount"
            register={register("referralDiscount", {
              required: "Referral discount is required",
              valueAsNumber: true,
            })}
            error={errors.referralDiscount}
          />

          <InputField
            label="Normal Discount"
            name="normalDiscount"
            placeholder="Enter normal discount"
            register={register("normalDiscount", {
              required: "Normal discount is required",
              valueAsNumber: true,
            })}
            error={errors.normalDiscount}
          /> */}
        </div>

        <div className="flex justify-end mt-5">
          <SaveButton  type="submit" text="Update Product" isLoading={isPending} />
        </div>
      </form>
    </div>
  );
}
