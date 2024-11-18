import React from "react";
import { useDistrictHead } from "../../../hooks/useDistrict";
import { useParams } from "react-router-dom";
import Spinner from "../../../components/loaders/Spinner";
import BackButton from "../../../components/Button/BackButton";
import Heading from "../../../components/Headings/Headings";
import MemberPreviewCard from "../../../components/Members/MemberPreviewCard";

export default function HeadPreview() {
  const { memberId } = useParams();
  const { data, isLoading } = useDistrictHead(memberId);

  if (isLoading) return <Spinner />;
  return (
    <div className="container mx-auto ">
      <BackButton path={-1} />
      <div className="bg-white p-4">
        <Heading text="District Head Registration" color="default" />
        <MemberPreviewCard data={data} />
      </div>
    </div>
  );
}
