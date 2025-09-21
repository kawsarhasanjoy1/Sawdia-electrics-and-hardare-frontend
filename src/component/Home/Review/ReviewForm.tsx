"use client";

import EHForm from "@/component/Form/EHForm";
import EHInput from "@/component/Form/EHInput";
import EHTextarea from "@/component/Form/EHTextArea";
import { defaultReviewsValues } from "@/constance/global";
import { useCreateReviewMutation } from "@/redux/api/reviewApi";
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { Rating as ReactRating } from "@smastrom/react-rating";

const ReviewForm = ({ product }: any) => {
  const [rating, setRating] = useState(0);
  const [addReview] = useCreateReviewMutation();

  const handleAddReview = async (data: FieldValues) => {
    data.rating = rating;
    try {
      const res = await addReview({
        productId: product?._id,
        rating,
        ...data,
      }).unwrap();
      if (res.success) {
        toast.success("Review added successfully!");
        setRating(0);
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to add review");
    }
  };

  return (
    <div className="mb-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
         Write a Review
      </h3>
      <EHForm onsubmit={handleAddReview} defaultValues={defaultReviewsValues}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Name Input */}
          <EHInput
            type="text"
            placeholder="Enter your name"
            name="name"
            label="Your Name"
          />

          {/* Rating */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Your Rating
            </label>
            <ReactRating
              style={{ maxWidth: 180 }}
              value={rating}
              onChange={setRating}
              className="mt-1"
            />
          </div>
        </div>

        {/* Comment */}
        <EHTextarea
          name="comment"
          label="Your Comment"
          placeholder="Write your review..."
          rows={4}
        />

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full md:w-auto bg-indigo-600 text-white font-medium px-6 py-2.5 rounded-lg shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 transition"
          >
             Submit Review
          </button>
        </div>
      </EHForm>
    </div>
  );
};

export default ReviewForm;
