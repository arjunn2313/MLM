import React from "react";
import HeadList from "../../../components/Members/Dashboard/HeadList";
import StatsCard from "../../../components/Members/Dashboard/StatsCard";
import PurchaseHistory from "../../../components/Members/Dashboard/PurchaseHistory";
import DownlineMembers from "../../../components/Members/Dashboard/Downline";
import ExpenseHistory from "../../../components/Members/Dashboard/ExpenseHistory";
import { useParams } from "react-router-dom";
import LoadingBox from "../../../components/Loaders/LoadingBox";
import { useMemberDash } from "../../../hooks/useMember";
import TablePlaceholder from "../../../components/loaders/TableSkelton";
import commision from "../../../assets/commission.svg";
import referal from "../../../assets/referal.svg";
import earnings from "../../../assets/earnings.svg";
import wallet from "../../../assets/wallet.svg";
import BackButton from "../../../components/Button/BackButton";

export default function MemberDashView() {
   const {memberId} = useParams() 
  const { data: member, isLoading } = useMemberDash(memberId);

  if (isLoading) {
    return (
      <div className=" overflow-hidden over">
        <LoadingBox />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <LoadingBox />
          <LoadingBox />

          <LoadingBox />
          <LoadingBox />
        </div>
        <div className="grid grid-cols-1  gap-4 mt-4 ">
          <TablePlaceholder />
        </div>
      </div>
    );
  }

  return (
    <>
      <BackButton path={-1} />
      <HeadList member={member} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <StatsCard title="Commission" amount="400" image={commision} />
        <StatsCard title="Referral Bonus" amount="200" image={referal} />
        <StatsCard title="Total Earnings" amount="600" image={earnings} />
        <StatsCard title="Wallet Balance" amount="250" image={wallet} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mt-4 ">
        <div className="lg:col-span-3">
          <PurchaseHistory />
        </div>
        <div className="lg:col-span-2">
          <DownlineMembers members={member} />
        </div>
      </div>

      <div className="mt-4  ">
        <ExpenseHistory member={member} />
      </div>
    </>
  );
}
