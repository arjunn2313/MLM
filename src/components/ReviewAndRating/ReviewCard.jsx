import moment from "moment";
import { useState } from "react";
import { GiFireworkRocket } from "react-icons/gi";
import { useUpdateReview } from "../../hooks/useRating";

const ReviewCard = ({ review }) => {
  const [reviewStatus, setReviewStatus] = useState(review.status);
  const { mutate, isPending } = useUpdateReview();

  const handleApprove = async () => {
    mutate(
      { id: review._id, status: "approved" },
      {
        onSuccess: () => {
          setReviewStatus("approved");
        },
        onError: (error) => {
          console.error("Failed to approve review:", error);
        },
      }
    );
  };

  const handleReject = async () => {
    mutate(
      { id: review._id, status: "rejected" },
      {
        onSuccess: () => {
          setReviewStatus("rejected");
        },
        onError: (error) => {
          console.error("Failed to reject review:", error);
        },
      }
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md my-6">
      {/* Header */}

      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center w-1/2">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-500">
              {review?.userId?.name}
            </h3>
            <div className="text-sm text-gray-500 space-y-4">
              <p className="text-sm">
                {moment(new Date(review?.createdAt)).format("MMMM DD, YYYY")}
              </p>
              <p className="capitalize">
                {moment(review?.createdAt).fromNow()}
              </p>
            </div>
          </div>
          {/* Rating */}
          <div className="flex mt-4">
            <div>
              <p className="text-blue-500 text-2xl">
                {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
              </p>
              <p className="text-lg font-semibold mt-4">{review.comment}</p>
              <p className="text-gray-600 text-sm mt-2">{review.description}</p>
            </div>
            <span className="ml-2 text-gray-500">({review.rating}/5)</span>
            <span
              className={`ml-2 text-lg font-semibold capitalize ${
                reviewStatus === "approved"
                  ? "text-green-500"
                  : reviewStatus === "rejected"
                  ? "text-red-500"
                  : "text-yellow-500"
              }`}
            >
              {reviewStatus}
            </span>
          </div>
        </div>

        {/* Product Category */}
        <div className="flex items-center justify-center gap-3 text-xl text-orange-500 font-serif font-semibold">
          <GiFireworkRocket />
          {review?.productId?.category}
        </div>
      </div>

      {/* Action Buttons and Status */}
      <div className="flex justify-end items-center mt-6">
        <div className="flex space-x-4">
          <button
            className="text-red-500 font-bold"
            onClick={handleReject}
            disabled={reviewStatus === "rejected" || isPending}
          >
            Reject
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded-md font-semibold"
            onClick={handleApprove}
            disabled={reviewStatus === "approved" || isPending}
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
