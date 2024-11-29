import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { useFetchOrderDetails } from "../../../hooks/useOrder";
import Invoice from "../../../components/Invoice/Invoice";
import { useReactToPrint } from "react-to-print";
import Spinner from "../../../components/loaders/Spinner";
import BackButton from "../../../components/Button/BackButton";
import Heading from "../../../components/Headings/Headings";
import { MdOutlineLocalPrintshop } from "react-icons/md";
import moment from "moment";

export default function OrderInvoice() {
  const { id } = useParams();
  const { data: orders, isLoading } = useFetchOrderDetails(id);
  const invoiceRef = useRef();

  if (isLoading) {
    return <Spinner />;
  }

  if (!orders) {
    return <div>No order details available.</div>;
  }

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
    documentTitle: `Invoice-${orders?.orderId}`,
  });

  return (
    <div className="container  ">
      <div className="flex items-center gap-5 mb-4">
        <BackButton path={-1} />
        <Heading text="Orders" />

        {/* template*/}
        <div style={{ display: "none" }}>
          <Invoice ref={invoiceRef} order={orders} />
        </div>
      </div>
      <div className="bg-white   p-5  shadow-md rounded-md">
        <div className="flex justify-between items-center mb-6  ">
          <h2 className="text-xl font-semibold">
            Invoice number : {orders?.orderId}
            <span className="text-green-500  ml-3 text-sm font-semibold">
              {orders?.status === "Dispatched" && orders.status}
            </span>
          </h2>
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2   border p-2 rounded-md border-blue-500 text-blue-500"
          >
            <MdOutlineLocalPrintshop />
            Print
          </button>
        </div>

        {/* customer details */}
        <div className="flex  justify-between items-center   gap-10">
          <div className="grid grid-cols-2  gap-5 py-5 border-r">
            <div className="font-semibold">Company Name</div>
            <div>MLM Sweets</div>
            <div className="font-semibold">Date of Dispatch</div>
            {orders?.trackingId ? (
              <div>
                {" "}
                {moment(new Date(orders?.updatedAt)).format("DD-MM-YYYY")}
              </div>
            ) : (
              <div> {moment(new Date()).format("DD-MM-YYYY")}</div>
            )}

            <div className="font-semibold">Contact Number</div>
            <div>{orders?.user?.phoneNumber}</div>
            <div className="font-semibold">Email ID</div>
            <div>mlmsweets@gmail.com</div>
            <div className="font-semibold">Billing Address</div>
            <div>
              {orders?.shippingAddress?.address} ,
              {orders?.shippingAddress?.city} ,{" "}
              {orders?.shippingAddress?.district},
              {orders?.shippingAddress?.state},
              {orders?.shippingAddress?.pincode}
            </div>
          </div>

          <div className="grid grid-cols-2  gap-5 py-5   ">
            <div className="font-semibold">Customer Name</div>
            <div>John</div>
            <div className="font-semibold">Date of Order</div>
            <div>
              {" "}
              {moment(new Date(orders?.createdAt)).format("DD-MM-YYYY")}
            </div>
            <div className="font-semibold">Contact Number</div>
            <div>{orders?.user?.phoneNumber}</div>
            <div className="font-semibold">Email ID</div>
            <div>{orders?.user?.email}</div>
            <div className="font-semibold">Billing Address</div>
            <div>
              {orders?.shippingAddress?.address} ,
              {orders?.shippingAddress?.city} ,{" "}
              {orders?.shippingAddress?.district},
              {orders?.shippingAddress?.state},
              {orders?.shippingAddress?.pincode}
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="my-6">
          <h3 className="text-lg font-medium mb-4">Product Details</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b px-4 py-2">Sl. no.</th>
                <th className="border-b px-4 py-2">Product</th>
                <th className="border-b px-4 py-2">Product Code</th>
                <th className="border-b px-4 py-2">Category</th>
                <th className="border-b px-4 py-2">Product Name</th>
                <th className="border-b px-4 py-2">Quantity</th>
                <th className="border-b px-4 py-2">Weight</th>
                <th className="border-b px-4 py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {orders?.items?.map((itm, ind) => (
                <tr>
                  <td className="border-b px-4 py-2">{ind + 1}</td>
                  <td className="border-b px-4 py-2">
                    {itm.productId.productName}
                  </td>
                  <td className="border-b px-4 py-2">
                    {itm.productId.productCode}
                  </td>
                  <td className="border-b px-4 py-2">
                    {itm.productId.category}
                  </td>
                  <td className="border-b px-4 py-2">
                    {itm.productId.productName}
                  </td>
                  <td className="border-b px-4 py-2">{itm.quantity}</td>
                  <td className="border-b px-4 py-2">250 gms</td>
                  <td className="border-b px-4 py-2">
                    Rs. {orders?.totalAmount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Subtotal Section */}
        <div className="text-right mb-6 space-y-2">
          <p>Subtotal : NA</p>
          <p>GST (10%) : NA</p>
          <p>Discount (10%) : NA</p>
          <p className="font-semibold">Total : Rs. {orders?.totalAmount}</p>
        </div>

        {/* Save Invoice Button */}
        {/* <div className="text-end">
          <button className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600" onClick={()=>navigate(`/orders/invoice/${id}`)}>
            View Invoice
          </button>
        </div> */}
      </div>
    </div>
  );
}
