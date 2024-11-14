import React from "react";

export default function EmployeeCard({ data }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3 p-3">
      <div className="flex flex-col sm:flex-row gap-8 sm:gap-28">
        <div className="space-y-2 sm:space-y-4 font-medium">
          <p>Name</p>
          <p>Employee Code</p>
          <p>Designation</p>
        </div>
        <div className="space-y-2 sm:space-y-4">
          <p>{data?.name}</p>
          <p>{data?.employeeCode}</p>
          <p>{data?.designation}</p>
        </div>
      </div>
      <div className="flex justify-center sm:justify-end">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3RCcez38sduC9iEjWm9nsq0mVyD5IAJGDog&s"
          alt="employee"
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-sm"
        />
      </div>
    </div>
  );
}
