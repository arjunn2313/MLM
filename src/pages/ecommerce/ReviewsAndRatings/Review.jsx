import React from "react";
import Heading from "../../../components/Headings/Headings";
import { useReview } from "../../../hooks/useRating";
import Spinner from "../../../components/loaders/Spinner";
import ReviewCard from "../../../components/ReviewAndRating/ReviewCard";

export default function Review() {
  const { data, isLoading, error } = useReview();

  if (isLoading) return <Spinner />;

  if (error)
    return (
      <p className="text-center text-gray-600">
        {error?.response?.data?.message}
      </p>
    );

  return (
    <div className="container mx-auto">
      <Heading text="Reviews & Ratings" />
      {data?.reviews?.map((review) => (
        <ReviewCard key={review?._id} review={review} />
      ))}
    </div>
  );
}
