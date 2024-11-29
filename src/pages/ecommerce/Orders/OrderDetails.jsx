import React, { useEffect, useRef } from "react";
import BackButton from "../../../components/Button/BackButton";
import Heading from "../../../components/Headings/Headings";
import { MdOutlineLocalPrintshop } from "react-icons/md";
import { useFetchOrderDetails } from "../../../hooks/useOrder";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { orderDetaildList } from "../../../constatnts/TableHeadings";
import Spinner from "../../../components/loaders/Spinner";
import { useReactToPrint } from "react-to-print";

export default function OrderDetails() {
  const { id } = useParams();
  const { data, isLoading } = useFetchOrderDetails(id);
  const invoiceRef = useRef(null);
  const navigate = useNavigate()
 
  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,  
    documentTitle: `Invoice-${data?.orderId}`, 
    onBeforePrint: () => {
      if (!invoiceRef.current) {
        console.error("No content to print. Make sure the ref is attached correctly.");
      }
    },
    onAfterPrint: () => console.log("Print job finished."),
  });

  useEffect(() => {
    if (!invoiceRef.current) {
      console.error("invoiceRef is not set correctly.");
    }
  }, [invoiceRef]);

  console.log(data);
  

  if (isLoading) return <Spinner />;
  return (
    <div className="container mx-auto "  >
      <div className="flex items-center gap-5 mb-3">
        <BackButton path={-1} />
        <Heading text="Orders" />
      </div>

      <div className="bg-white p-4">
        <div className="flex items-center justify-between mb-3">
          <Heading text="Customer details" color="default" />
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2   border p-2 rounded-md border-blue-500 text-blue-500"
          >
            <MdOutlineLocalPrintshop />
            Print
          </button>
        </div>

        {/* customer details */}
        <div className="grid grid-cols-2  gap-5 py-5  w-3/4" ref={invoiceRef}>
          <div className="font-semibold">Customer Name</div>
          <div>{data?.shippingAddress?.firstName}</div>
          <div className="font-semibold">Date of Order</div>
          <div> {moment(new Date(data?.createdAt)).format("DD-MM-YYYY")}</div>
          <div className="font-semibold">Contact Number</div>
          <div>{data?.user?.phoneNumber}</div>
          <div className="font-semibold">Email ID</div>
          <div>{data?.user?.email}</div>
          <div className="font-semibold">Billing Address</div>
          <div>
            {data?.shippingAddress?.address} ,{data?.shippingAddress?.city} ,{" "}
            {data?.shippingAddress?.district},{data?.shippingAddress?.state},
            {data?.shippingAddress?.pincode}
          </div>
        </div>

        <div className="mt-4">
          <div>
            <Heading text="Product Details" color="default" />
          </div>
          <div className="overflow-x-auto   mt-3  ">
            <table className="min-w-full border-collapse block md:table">
              <thead className="block md:table-header-group">
                <tr className="block md:table-row">
                  {orderDetaildList.map((header, index) => (
                    <th
                      key={index}
                      className="p-2 text-left block md:table-cell"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="block md:table-row-group capitalize">
                {data?.items?.map((data, index) => (
                  <tr
                    key={index}
                    className="border-t block md:table-row cursor-pointer"
                  >
                    <td className="p-2 py-4 block md:table-cell">
                      {index + 1}
                    </td>
                    <td className="p-2 block md:table-cell">
                      {data.productId?.productName}
                    </td>
                    <td className="p-2 block md:table-cell truncate">
                      {data.productId?.productCode}
                    </td>
                    <td className="p-2 block md:table-cell truncate">
                      {data.productId?.category}{" "}
                    </td>
                    <td className="p-2 block md:table-cell truncate">
                      {data.productId?.productName}
                    </td>
                    <td className="p-2 block md:table-cell truncate">
                      {data.quantity}
                    </td>
                    <td className="p-2 block md:table-cell truncate">NA</td>
                    <td className="p-2 block md:table-cell truncate">
                      Rs. {data.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Subtotal Section */}
        <div className="text-right mb-6 space-y-2 mr-5">
          <p>Subtotal : NA</p>
          <p>GST (10%) : NA</p>
          <p>Discount (10%) : NA</p>
          <p className="font-semibold">Total : Rs. {data?.totalAmount}</p>
        </div>

        {/* Save Invoice Button */}
        <div className="text-end">
          <button
            className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600"
            onClick={() => navigate(`/orders/invoice/${id}`)}
          >
            View Invoice
          </button>
        </div>
      </div>
    </div>
  );
}
