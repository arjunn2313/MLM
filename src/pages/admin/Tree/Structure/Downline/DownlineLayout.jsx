import React from 'react'
import { useSearchParams } from 'react-router-dom';
import DownlineList from './DownlineList';
import DownlineTree from './DownlineTree';

export default function DownlineLayout() {
    const [searchParams, setSearchParams] = useSearchParams();
  const treeView = searchParams.get("tree") || "table";

  const renderContent = () => {
    switch (treeView) {
      case "table":
        return <DownlineList/>;
      case "downlinetree":
        return <DownlineTree />;

      default:
        return null;
    }
  };

   return <div className="mt-5">{renderContent()}</div>;
}
