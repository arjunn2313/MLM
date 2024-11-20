import React from "react";
import HeaderStats from "../../../../components/Dashboard/HeaderStats";
import CategoryCard from "../../../../components/Product/Dashboard/CategoryCard";
import { useProductDashboard } from "../../../../hooks/useProduct";
import SweetsIMG from "../../../../assets/sweets.png";
import QuantityIMG from "../../../../assets/quantity.png";
import SalesChart from "../../../../components/Product/Dashboard/SalesChart";
import DonutChart from "../../../../components/Product/Dashboard/DonutChart";
import OrdersTable from "../../../../components/Product/Dashboard/OrdersTable";
import LowStock from "../../../../components/Product/Dashboard/LowStock";

export default function SnacksDashboard() {
  const { data, isLoading } = useProductDashboard();
  console.log(data);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6  ">
        {data?.data?.categories?.map((data) => (
          <CategoryCard
            isLoading={isLoading}
            color="border-primary"
            count={`${data?.totalQuantity} KG`}
            stat={`${data?.productCategory} `}
            icon={SweetsIMG}
          />
        ))}
        <CategoryCard
          color="border-primary"
          count={`${data?.data.combinedTotalQuantity} KG`}
          stat={`Total Snacks Sold`}
          icon={QuantityIMG}
        />
      </div>

      <div className="grid grid-cols-8 gap-3    mt-5">
        <div className="col-span-4">
          <SalesChart />
        </div>
        <div className="col-span-4">
          <DonutChart />
        </div>
      </div>

      <div className="grid grid-cols-8 gap-3    mt-5">
        <div className="col-span-5">
          <OrdersTable />
        </div>
        <div className="col-span-3">
          <LowStock />
        </div>
      </div>
    </>
  );
}
