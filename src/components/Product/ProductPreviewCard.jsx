import React from "react";

export default function ProductPreviewCard({ data }) {
 

  return (
    <div className="grid w-1/2 grid-cols-2 gap-4 mt-3 p-4 bg-white  ">
      <div className="font-medium text-gray-600">Product Code</div>
      <div className="text-gray-800">{data?.productCode || "N/A"}</div>

      <div className="font-medium text-gray-600">Product Category</div>
      <div className="text-gray-800">{data?.productCategory || "N/A"}</div>

      <div className="font-medium text-gray-600">Product Name</div>
      <div className="text-gray-800">{data?.productName || "N/A"}</div>

      <div className="font-medium text-gray-600">GST</div>
      <div className="text-gray-800">{`${data?.gst || "N/A"} %`}</div>

      {data?.varient?.variants?.map((itm, ind) => (
        <React.Fragment key={ind}>
          <div className="font-medium text-gray-600">MLM Discount</div>
          <div className="text-gray-800">{`${
            itm?.mlmDiscount || "N/A"
          } %`}</div>
          <div className="font-medium text-gray-600">Normal Discount</div>
          <div className="text-gray-800">{`${
            itm?.normalDiscount || "N/A"
          } %`}</div>
          <div className="font-medium text-gray-600">Refferal Discount</div>
          <div className="text-gray-800">{`${
            itm?.referralDiscount || "N/A"
          } %`}</div>
        </React.Fragment>
      ))}
    </div>
  );
}
