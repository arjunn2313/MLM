import React, { useState } from "react";
import Heading from "../../../components/Headings/Headings";
import SearchInput from "../../../components/Filter/Search";
import ActionButton from "../../../components/Button/ActionButton";

export default function HolidayList() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <React.Fragment>
      <div className="container bg-white mx-auto p-4 ">
        <div className="grid grid-cols-2 mb-4">
          <div className="flex items-center  gap-16">
            <Heading text="Holiday List" />
          </div>

          <div className="flex items-center justify-end space-x-5">
            <SearchInput
              placeholder="Search employees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <ActionButton buttonText="Add Holidays" to="create" />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
