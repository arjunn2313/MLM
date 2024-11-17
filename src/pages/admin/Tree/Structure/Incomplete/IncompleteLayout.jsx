import React from 'react'
import { useSearchParams } from 'react-router-dom';
import IncompleteList from './IncompleteList';
import IncompleteTree from './IncompleteTree';

export default function IncompleteLayout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const treeView = searchParams.get("tree") || "table";

 

  const renderContent = () => {
    switch (treeView) {
      case "table":
        return <IncompleteList />;
      case "incompletetree":
        return <IncompleteTree />;

      default:
        return null;
    }
  };
  return <div className="mt-5">{renderContent()}</div>;
}
