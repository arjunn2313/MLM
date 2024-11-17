import React from "react";
import { useSearchParams } from "react-router-dom";
import CompletedList from "./CompletedList";
import CompletedTree from "./CompletedTree";

export default function CompletedLayout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const treeView = searchParams.get("tree") || "table";

  const renderContent = () => {
    switch (treeView) {
      case "table":
        return <CompletedList />;
      case "completedtree":
        return <CompletedTree />;

      default:
        return null;
    }
  };

  return <div className="mt-5">{renderContent()}</div>;
}
