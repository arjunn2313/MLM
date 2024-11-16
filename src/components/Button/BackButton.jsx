import React from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function BackButton({path}) {
  const navigate = useNavigate();
  return (
    <div className="d-flex items-center py-2 text-gray-800 cursor-pointer">
      <MdOutlineKeyboardBackspace
        size={30}
        onClick={() => navigate(path)}
        className="cursor-pointer"
      />
    </div>
  );
}
