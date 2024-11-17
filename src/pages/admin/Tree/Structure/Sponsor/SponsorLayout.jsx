import React from "react";
import { useSearchParams } from "react-router-dom";
import SponsorList from "./SponsorList";
import SponsorTree from "./SponsorTree";

export default function SponsorLayout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const treeView = searchParams.get("tree") || "table";

  const renderContent = () => {
    switch (treeView) {
      case "table":
        return <SponsorList />;
      case "sponsortree":
        return <SponsorTree />;

      default:
        return null;
    }
  };

  return <div className="mt-5">{renderContent()}</div>;
}
