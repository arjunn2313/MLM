import { Link } from "react-router-dom";

const ActionButton = ({ buttonText, to }) => {
  return (
    <Link to={to}>
      <button className="bg-primary text-white px-5 py-1 rounded-md flex justify-center items-center gap-2">
        <span className="text-xl">+</span> {buttonText}
      </button>
    </Link>
  );
};

export default ActionButton;
