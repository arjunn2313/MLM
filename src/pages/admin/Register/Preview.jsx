import React from "react";
import BackButton from "../../../components/Button/BackButton";
import MemberPreviewCard from "../../../components/Members/MemberPreviewCard";
import Heading from "../../../components/Headings/Headings";
import { useMemberDetails } from "../../../hooks/useMember";
import { useParams } from "react-router-dom";
import Spinner from "../../../components/loaders/Spinner";
import MemberStatusCard from "../../../components/Members/MemberStatusCard";

export default function Preview() {
  const { memberId } = useParams();
  const { data, isLoading, error } = useMemberDetails(memberId);

  if (isLoading) return <Spinner size="10" borderSize="3" />;

  return (
    <div className="container mx-auto ">
      <BackButton path="/register"/>
      <div className="bg-white p-4">
        <Heading text="Registration Form" color="default" />
        <MemberPreviewCard data={data} />
        <MemberStatusCard data={data} />
      </div>
    </div>
  );
}
