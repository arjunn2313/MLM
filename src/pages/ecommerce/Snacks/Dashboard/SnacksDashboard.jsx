import React from "react";
import CategoryCard from "../../../../components/Product/Dashboard/CategoryCard";
import { useProductDashboard } from "../../../../hooks/useProduct";
import SweetsIMG from "../../../../assets/sweets.png";
import QuantityIMG from "../../../../assets/quantity.png";
import SalesChart from "../../../../components/Product/Dashboard/SalesChart";
import DonutChart from "../../../../components/Product/Dashboard/DonutChart";
import OrdersTable from "../../../../components/Product/Dashboard/OrdersTable";
import LowStock from "../../../../components/Product/Dashboard/LowStock";
import LoadingBox from "../../../../components/Loaders/LoadingBox";

export default function SnacksDashboard() {
  const { data, isLoading } = useProductDashboard();

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
        {isLoading && (
          <>
            <LoadingBox width="w-full" height="h-24" rounded="rounded-md" />
            <LoadingBox width="w-full" height="h-24" rounded="rounded-md" />
            <LoadingBox width="w-full" height="h-24" rounded="rounded-md" />
          </>
        )}
        {data?.data?.categories?.map((data,ind) => (
          <CategoryCard
            key={ind}
            isLoading={isLoading}
            color="border-primary"
            count={`${data?.totalQuantity} KG`}
            stat={`${data?.productCategory} `}
            icon={SweetsIMG}
          />
        ))}
        <CategoryCard
          isLoading={isLoading}
          color="border-primary"
          count={`${data?.data.combinedTotalQuantity} KG`}
          stat={`Total Snacks Sold`}
          icon={QuantityIMG}
        />
      </div>

      <div className="grid grid-cols-8 gap-3  h-full  mt-5">
        <div className="col-span-4">
          <SalesChart category="Snacks" />
        </div>
        <div className="col-span-4">
          <DonutChart category="Snacks" />
        </div>
      </div>

      <div className="grid grid-cols-8 gap-3    mt-5">
        <div className="col-span-5">
          <OrdersTable category="Snacks" />
        </div>
        <div className="col-span-3">
          <LowStock />
        </div>
      </div>
    </div>
  );
}
