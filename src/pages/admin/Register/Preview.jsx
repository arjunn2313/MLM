import React from "react";
import BackButton from "../../../components/Button/BackButton";
import MemberPreviewCard from "../../../components/Members/MemberPreviewCard";
import Heading from "../../../components/Headings/Headings";
import { useMemberDetails } from "../../../hooks/useMember";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../components/loaders/Spinner";
import MemberStatusCard from "../../../components/Members/MemberStatusCard";
import { CiEdit } from "react-icons/ci";

export default function Preview() {
  const { memberId } = useParams();
  const { data, isLoading, error } = useMemberDetails(memberId);
  const navigate = useNavigate()

  if (isLoading) return <Spinner size="10" borderSize="3" />;

  return (
    <div className="container mx-auto ">
      <BackButton path="/register" />{" "}
      <div className="bg-white p-4">
        <div className="flex justify-between items-center ">
          <Heading text="Registration Form" color="default" />
          <button
            className="text-primary hover:text-blue-700 flex items-center justify-center gap-2"
            onClick={() => navigate(`/register/update/${memberId}`)}
          >
            <CiEdit />
            Edit
          </button>
        </div>
        <MemberPreviewCard data={data} />
        <MemberStatusCard data={data} />
      </div>
    </div>
  );
}
