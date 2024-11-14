import HeaderStats from "../../../components/Dashboard/HeaderStats";
import MembersJoined from "../../../components/Members/MembersJoined";
import DistrictHeads from "../../../components/DistrictHeads/DistrictHead";
import MembersTable from "../../../components/Members/MembersTable";
import { useDashCount } from "../../../hooks/useDashboard";
import Member from "../../../assets/members.png"
import TotalTree from "../../../assets/total tree.png"
import District from "../../../assets/dashDistrict.png"
import Dashtree from "../../../assets/DashTree.png"

export default function AdminDashboard() {
  const { data, isLoading, error } = useDashCount();

  const stats = [
    { title: "Total Members", count: 1500 },
    { title: "Total Trees", count: 25 },
    { title: "Total Districts", count: 5 },
    { title: "Incomplete Trees", count: 30 },
  ];
  const count = {
    totalMembers: data?.approvedAgentCount,
    totalTrees: data?.treesCount,
    totalDistrict: data?.districtCount,
    incomplete: data?.incompleteTreeCount,
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
        <HeaderStats
          isLoading={isLoading}
          color="border-orange-500"
          stat={stats[0]}
          count={count.totalMembers}
          icon={Member}
        />
        <HeaderStats
          isLoading={isLoading}
          color="border-purple-500"
          stat={stats[1]}
          count={count.totalTrees}
          icon={TotalTree}
        />
        <HeaderStats
          isLoading={isLoading}
          color="border-blue-500"
          stat={stats[2]}
          count={count.totalDistrict}
          icon={District}
        />
        <HeaderStats
          isLoading={isLoading}
          color="border-violet-500"
          stat={stats[3]}
          count={count.incomplete}
          icon={Dashtree}
        />
        <div className="flex flex-col lg:flex-row mt-6">
          <MembersJoined />
          <DistrictHeads />
        </div>
        <MembersTable />
      </div>
    </>
  );
}
