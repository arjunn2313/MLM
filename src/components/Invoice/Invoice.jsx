import React from "react";
 

const Invoice = React.forwardRef((props, ref) => {
  const { order } = props;

  return (
    <div
      ref={ref}
      className="bg-white p-8 max-w-4xl mx-auto border-t-8 border-gray-900"
    >
      {/* Header Section */}
      <div className="flex justify-between  border-b-4 py-8 mb-6">
        <div className="space-y-3 text-gray-800">
          <h1 className="text-2xl font-bold text-black font-serif">SIP</h1>
          <p className="text-sm">
            XYZ, ABCDE, Nagercoil, Kanyakumari,
            <br /> Tamil Nadu, India 629001
          </p>
          <p className="text-sm">Phone Number: +91 90876 54321</p>
          <p className="text-sm">GST No: 22GJHKJL5432T1CZ</p>
        </div>
        <div className="text-right space-y-3">
          <h2 className="text-xl font-semibold">
            Invoice number: <span className="font-bold">IN2024015</span>
          </h2>
          <p className="text-sm text-gray-700">Invoice date: 14 May 2024</p>
        </div>
      </div>

      {/* Customer Details */}
      <div className="flex justify-between  border-b-4 py-6 mb-6">
        <div className="space-y-3 text-gray-800">
          <h1 className="text-lg font-bold text-gray-800  ">
            Bill and Shipping to:
          </h1>
          <p className="text-sm">
            XYZ, ABCDE, Nagercoil, Kanyakumari,
            <br /> Tamil Nadu, India 629001
          </p>
          <p className="text-sm">Phone Number: +91 90876 54321</p>
        </div>
        <div className="text-right space-y-3">
          <h2 className="text-md font-semibold  text-gray-800">Total Amount</h2>
          <p className="text-sm text-gray-700">Rs. 9,497.00</p>
        </div>
      </div>

      {/* Product Table */}
      <div className="border border-black rounded-md overflow-hidden">
        <table className="w-full text-sm    text-left mb-6">
          <thead>
            <tr>
              <th className=" px-4 py-2">Sl. No.</th>
              <th className=" px-4 py-2">Product Name</th>
              <th className=" px-4 py-2">QTY</th>
              <th className=" px-4 py-2">MRP</th>
              <th className=" px-4 py-2">Rate</th>
              <th className=" px-4 py-2">Discount</th>
              <th className=" px-4 py-2">GST</th>
              <th className=" px-4 py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {order?.items.map((itm, indx) => (
              <tr className="border-t border-black " key={indx}>
                <td className=" px-4 py-2 text-left">{indx + 1}</td>
                <td className=" px-4 py-2">{itm.product?.productName}</td>
                <td className=" px-4 py-2 text-center">{itm?.quantity}</td>
                <td className=" px-4 py-2 text-right">₹ {itm?.price}</td>
                <td className=" px-4 py-2 text-right">NA</td>
                <td className=" px-4 py-2 text-center">NA</td>
                <td className=" px-4 py-2 text-center">NA</td>
                <td className=" px-4 py-2 text-right">₹ {itm?.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="bg-gray-200 text-end p-2 border-t border-b border-black">
          <p>Total Amount : 8620.00</p>
        </div>
        {/* Total Section */}
        <div className="flex justify-end  ">
          <div className="border-l border-r text-sm border-black  overflow-hidden">
            <div className="flex border-b border-black">
              <div className="flex-1 p-2 px-10">Round Off</div>
              <div className="flex-1 p-2 px-10 border-l border-black">
                ₹ -0.40
              </div>
            </div>
            <div className="flex border-b border-black">
              <div className="flex-1 p-2 px-10">Amount</div>
              <div className="flex-1 p-2 px-10 border-l border-black">
                ₹ 1576.49
              </div>
            </div>
            <div className="flex border-b border-black">
              <div className="flex-1 p-2 px-10">Discount</div>
              <div className="flex-1 p-2 px-10 border-l border-black">
                ₹ 8268.00
              </div>
            </div>
            <div className="flex border-b border-black">
              <div className="flex-1 p-2 px-10 font-bold">Net Amount</div>
              <div className="flex-1 p-2 px-10 font-bold border-l border-black">
                ₹ 99.00
              </div>
            </div>
            <div className="flex">
              <div className="flex-1 p-2 px-10 font-bold ">Total Amount</div>
              <div className="flex-1 p-2 px-10 font-bold border-l border-black">
                ₹ {order?.totalAmount}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="border-t  pt-5 text-center  space-y-6   text-sm ">
        <p>-- THIS IS A DIGITALLY CREATED INVOICE --</p>
        <div className="flex justify-between">
          <p>Thank you for the business.</p>
          <p className="font-semibold">AUTHORIZED SIGNATURE</p>
        </div>
      </div>
    </div>
  );
});

export default Invoice;
