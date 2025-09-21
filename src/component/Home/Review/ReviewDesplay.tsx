"use client";

import React from "react";
import { Rating as ReactRating } from "@smastrom/react-rating";
import Image from "next/image";

const ReviewDisplay = ({ product }: any) => {
  return (
    <div className="space-y-6">
      {product?.reviews?.length > 0 ? (
        product?.reviews?.map((rev: any) => (
          <div
            key={rev._id}
            className="flex gap-4 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 
                       shadow-md bg-white/70 dark:bg-zinc-900/70 hover:shadow-xl transition-all"
          >
            {/* User Avatar */}
            <div className="flex-shrink-0">
              <Image
                src={rev?.userId?.image || "/default-avatar.png"}
                alt={rev?.userId?.name || "User"}
                width={60}
                height={60}
                className="w-14 h-14 rounded-full object-cover border border-gray-300 dark:border-gray-600"
              />
            </div>

            {/* Review Content */}
            <div className="flex-1 space-y-2">
              {/* User Name + Date */}
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {rev?.userId?.name || "Anonymous User"}
                </h4>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(rev?.createdAt).toLocaleDateString()}
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <ReactRating style={{ maxWidth: 120 }} value={rev?.rating} readOnly />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {rev?.rating}/5
                </span>
              </div>

              {/* Comment */}
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {rev?.comment}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-center w-full">
          No reviews yet.
        </p>
      )}
    </div>
  );
};

export default ReviewDisplay;
