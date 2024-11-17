import React from "react";
import BackButton from "../../../../components/Button/BackButton";
import Heading from "../../../../components/Headings/Headings";
import { useParams, useSearchParams } from "react-router-dom";
import TreeView from "./TreeView/TreeView";
import SponsorLayout from "./Sponsor/SponsorLayout";
import DownlineLayout from "./Downline/DownlineLayout";
import MemberLayout from "./MemberList/MemberLayout";
import CompletedLayout from "./Completed/CompletedLayout";
import IncompleteLayout from "./Incomplete/IncompleteLayout";

export default function BranchLayout() {
  const { name } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTab = searchParams.get("tab") || "TreeView";

  const tabs = [
    { id: "TreeView", label: "Tree View" },
    { id: "Sponsors", label: "Sponsors" },
    { id: "DownlineMember", label: "Downline Member" },
    { id: "MemberList", label: "Member List" },
    { id: "IncompleteList", label: "Incomplete Trees" },
    { id: "CompletedList", label: "Completed Trees" },
  ];

  const handleTabChange = (tab) => {
    setSearchParams({ tab });
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "TreeView":
        return <TreeView />;
      case "Sponsors":
        return <SponsorLayout />;
      case "DownlineMember":
        return <DownlineLayout />;
      case "MemberList":
        return <MemberLayout />;

      case "CompletedList":
        return <CompletedLayout />;
      case "IncompleteList":
        return <IncompleteLayout />;

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto ">
      <div className="flex items-center gap-5 mb-3">
        <BackButton path={-1} />
        <Heading text={name} />
      </div>
      <div className="bg-white rounded-xl shadow-md px-5">
        <ul className="flex gap-10 text-gray-600 font-medium">
          {tabs.map((tab) => (
            <li
              key={tab.id}
              className={`p-4 cursor-pointer${
                selectedTab === tab.id
                  ? " text-blue-500 border-b-2 border-blue-500"
                  : ""
              }`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5">{renderContent()}</div>
    </div>
  );
}
