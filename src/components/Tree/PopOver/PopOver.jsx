import moment from "moment";
import React, { useState } from "react";


const Popover = ({ posX, posY, content }) => {
  const [isVisible, setIsVisible] = useState(true);

  const showPopover = () => {
    setIsVisible(true);
  };

  const hidePopover = () => {
    setIsVisible(false);
  };

  const contentHead = [
    {
      head: "Joining Date",
      value: moment(new Date(content?.joiningDate)).format("DD-MM-YYYY"),
    },
    {
      head: "Mobile no.",
      value: content?.phoneNumber,
    },
    {
      head: "Sponsor ID",
      value: content?.sponsorId,
    },
    {
      head: "Sponsor Name",
      value: content?.sponsorName,
    },
    {
      head: "Level",
      value: content?.level,
    },
  ];

  

  return (
    <div className="absolute z-10" style={{ left: posX, top: posY }}>
      {/* Popover content */}
      {isVisible && (
        <div
          className="text-sm w-60  h-72 overflow-hidden text-gray-500 transition-opacity duration-300 bg-white    
         shadow-sm dark:text-gray-400   dark  rounded-xl  border-popover  border"
        >
          {/* heading */}
          <div className="px-3 overflow-hidden bg-popover flex flex-col items-center justify-center h-1/2">
            <div className="bg-white rounded-full w-14 h-14  inline-block">
              <span>
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL}/${content.photoUrl}`}
                  alt="img"
                  className="w-full h-full rounded-full object-cover"
                />
              </span>
            </div>

            <p className="text-white py-1">{content?.name}</p>
            <p className="text-white">{content?.user}</p>
          </div>

          <div className="py-2 ">
            {contentHead.map((itm, indx) => (
              <div
                className="grid grid-cols-5 w-[90%] mx-auto space-y-1 text-[12px]"
                key={indx}
              >
                <p className="col-span-2   text-popover font-medium">
                  {itm.head}
                </p>
                <p className="col-span-1 text-center  text-popover">:</p>
                <p className="col-span-2  ">{itm?.value}</p>
              </div>
            ))}
          </div>

          <div
            className="absolute  bg-popover "
            style={{
              left: "50%",
              transform: "translateX(-50%)",
              top: "-4px",
              width: "10px",
              height: "10px",
              transform: "rotate(45deg)",
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Popover;