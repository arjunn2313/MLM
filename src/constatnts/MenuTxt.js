import { BiLockAlt } from "react-icons/bi";
import { FaClipboardList } from "react-icons/fa";
import { GiLevelEndFlag } from "react-icons/gi";
import { GoCodeReview } from "react-icons/go";
import { ImTree } from "react-icons/im";
import { IoIosCheckboxOutline } from "react-icons/io";
import { IoPeopleOutline } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { PiCookieThin, PiUsersThreeBold } from "react-icons/pi";
import {
  TbBinaryTree,
  TbBinaryTree2,
  TbFileDescription,
  TbTruckDelivery,
} from "react-icons/tb";
import { TfiWallet } from "react-icons/tfi";

const Management = [
  { label: "Dashboard", icon: MdOutlineDashboard, path: "/" },
  { label: "Register", icon: BiLockAlt, path: "/register" },
  { label: "Tree", icon: ImTree, path: "/tree/district" },
  { label: "Incomplete Trees", icon: TbBinaryTree, path: "/incomplete-tree" },
  { label: "Completed Trees", icon: TbBinaryTree2, path: "/completed-tree" },
  { label: "Levels", icon: GiLevelEndFlag, path: "/levels-tracking" },
  { label: "Members", icon: IoPeopleOutline, path: "/members" },
  {
    label: "Wallet",
    icon: TfiWallet,
    path: "/wallet",
    submenu: [
      { label: "Commission", path: "/wallet/commission" },
      { label: "Referral Bonus", path: "/wallet/referal" },
      { label: " Settings", path: "/wallet/settings" },
    ],
  },
  { label: "District Head", icon: PiUsersThreeBold, path: "/district-head" },
  { label: "Reports", icon: TbFileDescription, path: "/reports" },

  {
    label: "Snacks",
    icon: PiCookieThin,
    path: "/snacks",
    submenu: [
      { label: "Dashboard", path: "/snacks/dashboard" },
      { label: "Upload Products", path: "/snacks/list" },
      { label: " Stocks", path: "/snacks/stock" },
    ],
  },
  {
    label: "Crackers",
    icon: FaClipboardList,
    path: "/crackers",
    submenu: [
      { label: "Dashboard", path: "/crackers/dashboard" },
      { label: "Upload Products", path: "/crackers/list" },
      { label: " Stocks", path: "/crackers/stock" },
    ],
  },
  { label: "Orders", icon: IoIosCheckboxOutline, path: "/orders" },
  { label: "Delivery Tracking", icon: TbTruckDelivery, path: "/delivery" },
  { label: "Expense", icon: TbTruckDelivery, path: "/expense" },
  { label: "Reviews & Ratings", icon: GoCodeReview, path: "/reviews" },
];

export default Management;
