import React from "react";
import personalInformationKeys from "../../constatnts/Employee";

export default function Personalnformation() {
  return (
    <div className="p-5">
      <div className="flex mt-3 flex-col sm:flex-row gap-8 sm:gap-28">
        <div className="space-y-2 sm:space-y-4 font-medium ">
          {personalInformationKeys.map((key, ind) => (
            <p key={ind}>{key}</p>
          ))}
        </div>
        <div className="space-y-2 sm:space-y-4">
           
        </div>
      </div>
    </div>
  );
}
