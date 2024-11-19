import React from "react";

const productKeys = [
    "Product code",
    "Product Category",
    "Product name",
    "GST",
    "MLM Discount",
    "Normal Discount",
  ];

export default function ProductPreviewCard({data}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3 p-3">
      <div className="flex flex-col sm:flex-row gap-8 sm:gap-28">
        <div className="space-y-2 sm:space-y-4 font-medium">
          {productKeys.map((key, ind) => (
            <p key={ind}>{key}</p>
          ))}
        </div>
        <div className="space-y-2 sm:space-y-4">
          <p>{data?.productCode}</p>
          <p>{data?.productCategory}</p>
          <p>{data?.productName}</p>
          <p>{data?.gst} %</p>
          <p>{data?.mlmDiscount} %</p>
          <p>{data?.normalDiscount} %</p>
        </div>
      </div>
    </div>
  );
}
