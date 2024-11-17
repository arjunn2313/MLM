import React from "react";
import { useSearchParams } from "react-router-dom";
import MemberList from "./MemberList";
import MemberDashboard from "./MemberDashboard";

export default function MemberLayout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const memberView = searchParams.get("tree") || "table";

  const renderContent = () => {
    switch (memberView) {
      case "table":
        return <MemberList />;
      case "dash":
        return <MemberDashboard />;

      // case "history":
      //   return <ExpenseHis />;

      default:
        return null;
    }
  };

  return <div className="">{renderContent()}</div>;
}
