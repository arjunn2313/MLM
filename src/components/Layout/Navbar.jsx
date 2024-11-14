import { IoIosNotifications } from "react-icons/io";

const Navbar = () => {
  return (
    <div className="flex justify-end items-center bg-white   p-4">
      {/* <div className="flex justify-between items-center w-[85%] border-r px-5">
        <IoIosNotifications size={25}/>
      </div> */}
      <div className="flex items-center border-l ">
        <span className="mr-4 ml-4">Joseph</span>
        <img
          src="https://via.placeholder.com/40"
          alt="User Avatar"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </div>
  );
};

export default Navbar;
