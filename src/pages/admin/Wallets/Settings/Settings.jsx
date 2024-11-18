import React from "react";
import { useSearchParams } from "react-router-dom";
import SetCommision from "./SetCommision";
import SetRefferal from "./SetRefferal";

export default function Settings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTab = searchParams.get("tab") || "commision";

  const handleTabChange = (tab) => {
    setSearchParams({ tab });
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "commision":
        return <SetCommision />;
      case "referal":
        return <SetRefferal />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full grid grid-cols-3 gap-2">
      <div className="bg-white col-span-1">
        <ul className="text-lg text-gray-600 font-medium cursor-pointer">
          <li
            className={`border-b  p-7 ${
              selectedTab === "commision" && "bg-blue-200"
            }`}
            onClick={() => handleTabChange("commision")}
          >
            Commission
          </li>
          <li
            className={`border-b  p-7 ${
              selectedTab === "referal" && "bg-blue-200"
            }`}
            onClick={() => handleTabChange("referal")}
          >
            Referral Bonus
          </li>
        </ul>
      </div>
      <div className="col-span-2">{renderContent()}</div>
    </div>
  );
}
