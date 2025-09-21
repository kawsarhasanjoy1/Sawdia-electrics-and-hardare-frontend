// components/ReviewCarousel.tsx
"use client";
import { TReview } from "@/interface/global";
import { useGetAllReviewQuery } from "@/redux/api/reviewApi";
import { formatDate } from "@/utils/formateDate";
import Image from "next/image";
import { useState } from "react";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const Review = () => {
  const { data, isLoading, isError } = useGetAllReviewQuery(undefined);
  const reviews = data?.data;
  const [currentSlider, setCurrentSlider] = useState(0);

  const prevSlider = () => {
    if (!reviews) return;
    setCurrentSlider((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const nextSlider = () => {
    if (!reviews) return;
    setCurrentSlider((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96 bg-gray-100">
        <p className="text-xl text-gray-600 animate-pulse">Loading reviews...</p>
      </div>
    );
  }

  if (isError || !reviews || reviews.length === 0) {
    return (
      <div className="flex justify-center items-center h-96 bg-gray-100">
        <p className="text-xl text-gray-500">No reviews available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden w-full py-16 bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-12 relative z-10">
          Our Valued Customers Say
        </h2>
        <div className="relative w-full">
          {/* Carousel Body */}
          <div
            className="flex transition-transform duration-700 ease-in-out w-full"
            style={{ transform: `translateX(-${currentSlider * 100}%)` }}
          >
            {reviews.map((item: TReview, index: number) => (
              <div
                key={index}
                className="w-full flex-shrink-0 flex items-center justify-center p-4"
              >
                <div className="bg-white rounded-3xl shadow-2xl p-5 md:p-12 md:max-w-4xl w-full mx-auto flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <Image
                      src={item?.userId?.profileImage || 'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?q=80&w=2070&auto=format&fit=crop'}
                      width={160}
                      height={160}
                      alt={`Customer review by ${item?.userId?.name}`}
                      className="rounded-full w-[150px] h-[150px] shadow-lg border-4 border-purple-400 object-cover"
                    />
                  </div>
                  <div className="text-center md:text-left">
                    <FaQuoteLeft className="text-purple-500 text-3xl mb-4 mx-auto md:mx-0" />
                    <p className="text-gray-600 text-lg md:text-xl italic leading-relaxed mb-4">
                      {item?.comment}
                    </p>
                    {/* Star Rating */}
                    <div className="flex justify-center md:justify-start items-center space-x-1 text-yellow-400 mb-2">
                      {Array.from({ length: 5 }, (_, i) => (
                        <FaStar
                          key={i}
                          className={i < item.rating ? 'text-yellow-400' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <div className="font-bold text-gray-800 text-xl">
                      {item?.userId?.name}
                    </div>
                    {/* Creation Date */}
                    <div className="text-sm text-gray-500 mt-1">
                      Reviewed on {formatDate(item.createdAt)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Navigation Buttons */}
          <button
            onClick={prevSlider}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white text-gray-800 p-3 rounded-full shadow-lg transform -translate-x-1/2 md:translate-x-0 transition-all duration-300 hover:bg-gray-200 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-gray-400"
          >
            <CgChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={nextSlider}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white text-gray-800 p-3 rounded-full shadow-lg transform translate-x-1/2 md:translate-x-0 transition-all duration-300 hover:bg-gray-200 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-gray-400"
          >
            <CgChevronRight className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;