import { useNavigate } from "react-router-dom";
import DistrictImg from "../../../assets/Mask group.svg";

const DistrictCard = ({ district }) => {
  const navigate = useNavigate();

  return (
    <div
      key={district._id}
      onClick={() => navigate(`${district.name}/${district._id}`)}
      className="bg-white border-2 border-blue-500 cursor-pointer flex flex-col items-center justify-center space-y-3 w-full sm:w-[48%] md:w-[30%] lg:w-[22%] h-[100px] rounded-lg"
    >
      <img
        src={DistrictImg}
        className="w-[30px] h-[30px]"
        alt={district.name}
      />
      <span className="text-xl text-blue-500 font-bold capitalize">
        {district.name}
      </span>
    </div>
  );
};

export default DistrictCard;
