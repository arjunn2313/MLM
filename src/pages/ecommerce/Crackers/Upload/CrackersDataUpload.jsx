import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Heading from "../../../../components/Headings/Headings";
import InputField from "../../../../components/Form/InputField";
import {
  useCheckProduct,
  useUpdateProductInstance,
} from "../../../../hooks/useProduct";
import FileUploadField from "../../../../components/Form/FileUpload";
import SaveButton from "../../../../components/Button/saveButton";

export default function CrackersDataUpload() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
    control,
  } = useForm();

  const productCode = watch("productCode");

  const calculateDiscountedPrice = (price, discount) => {
    return (price - (price * discount) / 100).toFixed(2);
  };

  const { mlmDiscount, referralDiscount, normalDiscount, price } = watch();

  if (price === undefined || price === null || isNaN(price) || price <= 0) {
    console.error("Price is not valid:", price);
  }

  const priceWithMLMDiscount = calculateDiscountedPrice(price, mlmDiscount);
  const priceWithReferralDiscount = calculateDiscountedPrice(
    price,
    referralDiscount
  );
  const priceWithNormalDiscount = calculateDiscountedPrice(
    price,
    normalDiscount
  );

  const { data, isLoading, error: productError } = useCheckProduct(productCode);
  const { mutate, isPending } = useUpdateProductInstance();

  useEffect(() => {
    if (data) {
      setValue("productCategory", data?.productCategory);
      setValue("productName", data?.productName);
    }
  }, [data, setValue]);

  const onSubmit = (data) => {
    const formData = new FormData();

    const fields = {
      productCode: data.productCode,
      productCategory: data.productCategory,
      productName: data.productName,
      category: "Crackers",
      gst: data.gst,
      quantity: data.quantity,
      unit: data.unit,
      pieces: data.pieces,
      price: data.price,
      mlmDiscount: data.mlmDiscount,
      referralDiscount: data.referralDiscount,
      normalDiscount: data.normalDiscount,
      mlmPrice: parseInt(priceWithMLMDiscount),
      referralPrice: parseInt(priceWithReferralDiscount),
      normalPrice: parseInt(priceWithNormalDiscount),
    };

    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formData.append("productImage", data.photo);

    mutate(
      { formData, productCode: data.productCode },
      {
        onSuccess: () => reset(),
      }
    );
  };

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
              valueAsNumber: true,
            })}
            error={errors.gst}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <div className="flex items-center border mt-1 rounded-md overflow-hidden">
              <input
                type="text"
                className="flex-1 px-4 py-2 border-none focus:outline-none"
                placeholder="Enter quantity"
                {...register("quantity", {
                  required: "Quantity is required",
                  valueAsNumber: true,
                })}
              />
              <select
                className="h-full bg-gray-100 px-4 py-2 focus:outline-none border-none"
                {...register("unit", {
                  required: "Unit is required",
                })}
              >
                <option value="pack">Pack</option>
                <option value="box">Box</option>
              </select>
            </div>

            {errors.quantity && (
              <p className="text-red-500 text-sm">{errors.quantity.message}</p>
            )}
          </div>

          <InputField
            label="Pieces"
            name="pieces"
            placeholder="Enter pieces"
            register={register("pieces", {
              required: "pieces is required",
              valueAsNumber: true,
            })}
            error={errors.pieces}
          />

          <InputField
            label="Price"
            name="price"
            placeholder="Enter price"
            register={register("price", {
              required: "price is required",
              valueAsNumber: true,
            })}
            error={errors.price}
          />
          <div></div>
          <InputField
            label="MLM Discount"
            name="mlmDiscount"
            placeholder="Enter mlm discount"
            register={register("mlmDiscount", {
              required: "mlm discount is required",
              valueAsNumber: true,
            })}
            error={errors.mlmDiscount}
          />

          <InputField
            label="Referral Discount"
            name="referralDiscount"
            placeholder="Enter referral discount"
            register={register("referralDiscount", {
              required: "referal discount is required",
              valueAsNumber: true,
            })}
            error={errors.referralDiscount}
          />
          <InputField
            label="Normal Discount"
            name="normalDiscount"
            placeholder="Enter gst"
            register={register("normalDiscount", {
              required: "Normal discount is required",
              valueAsNumber: true,
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

        <div className="flex justify-between items-center mt-5">
          <div className="flex items-center gap-3">
            <label className="block text-sm font-medium   mr-2">
              Price After MLM Discount
            </label>

            <span className="text-green-500 font-semibold">
              {priceWithMLMDiscount} Rs
            </span>
          </div>
          <div className="flex items-center gap-3">
            <label className="block text-sm font-medium    mr-2">
              Price After Refferal Discount
            </label>

            <span className="text-green-500 font-semibold">
              {priceWithReferralDiscount} Rs
            </span>
          </div>
          <div className="flex items-center gap-3">
            <label className="block text-sm font-medium   mr-2">
              Price After Normal Discount
            </label>

            <span className="text-green-500 font-semibold">
              {priceWithNormalDiscount} Rs
            </span>
          </div>
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
